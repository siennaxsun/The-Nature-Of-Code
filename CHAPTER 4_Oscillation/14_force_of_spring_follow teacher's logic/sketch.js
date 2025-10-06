// have two classes--spring class, bob class

let bob;
let spring;

function setup() {
  createCanvas(400, 400);
  let x = width/2
  bob = new Bob(x, 350);
  spring = new Spring(x, height/2, 0.5);
}

function draw() {
  background(220);
   
  // apply gravity
  let gravity = createVector(0, 5);
  bob.applyForce(gravity)
  
  // apply spring force
  spring.applySpringForce(bob);
  
  // Constrain spring distance between min and max
  spring.constrainLength(bob, 30, 200);

  bob.update();
  bob.show();
  spring.show(bob);
  
}

function mousePressed() {
  bob.handleClick(mouseX, mouseY);
}

function mouseReleased() {
  bob.stopDragging();
}


class Bob{
  constructor(x, y){
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.topspeed = 5;
    this.mass = 20;
    this.damping = 0.98;
    // For user interaction
    this.dragOffset = createVector();
    this.dragging = false;
    
    
  }
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.mult(0.98);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    
    // dont forget to reset acceleration
    this.acceleration.mult(0);
  }
  
  applyForce(force){
    // use newton's second law: F = M*A
    let f = force.copy();
    f.div(this.mass);
    // f.mult(0.01);
    this.acceleration.add(f);
  }
  
  show(){
    stroke(1);
    fill(100);
    circle(this.position.x, this.position.y, 50);
  }
  
  handleClick(mx, my) {
    let d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.mass) {
      this.dragging = true;
      this.dragOffset.x = this.position.x - mx;
      this.dragOffset.y = this.position.y - my;
    }
  }

  stopDragging() {
    this.dragging = false;
  }

  handleDrag(mx, my) {
    if (this.dragging) {
      this.position.x = mx + this.dragOffset.x;
      this.position.y = my + this.dragOffset.y;
    }
  }
  
}


class Spring{
  constructor(x, y, k){
    this.position = createVector(x, y);
    this.restLength = 50;
    this.k = k;

  }
  
  applySpringForce(bob){
    let springForce = p5.Vector.sub(bob.position, this.position);
    let currentLength = springForce.mag()
    springForce.setMag(-1*this.k*(currentLength-this.restLength));
    
    bob.applyForce(springForce);
  }
  
  constrainLength(bob, minLength, maxLength){
    let springForce = p5.Vector.sub(bob.position, this.position);
    let currentLength = springForce.mag();
    
    if (currentLength < minLength){
      springForce.setMag(minLength);
      // Keep position within constraint.
      bob.position= p5.Vector.add(this.position, springForce);
      bob.velocity.mult(0);
    }
    
    if (currentLength > maxLength){
      springForce.setMag(maxLength);
      bob.position= p5.Vector.add(this.position, springForce);
      bob.velocity.mult(0);
    }
    
  }
  
  show(bob){
    strokeWeight(2);
    stroke(1);
    line(this.position.x, this.position.y, bob.position.x, bob.position.y)
  }
}





