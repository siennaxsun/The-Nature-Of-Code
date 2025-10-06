/*Create a system of multiple bobs and spring connections. How about connecting a bob to another bob with no fixed anchor?*/

let bob1;
let bob2;
let spring1;
let spring2;

function setup() {
  createCanvas(400, 400);
  
  let mass1 = 20;
  let mass2 = 40;
  
  // spring1 is fixed to a point for bob1
  spring1 = new Spring(width/2, 50, 0.2, 50, 1);
  
  // Bob1 connected to spring1 with a fixed anchor
  bob1 = new Bob(width/2, 150, mass1);
  
  // Bob2 connected to bob1 via spring2
  spring2 = new Spring(bob1.position.x, bob1.position.y, 0.1, 100, 4);
  
  // Bob 2
  bob2 = new Bob(bob1.position.x+random(-10, 10), bob1.position.y+150, mass2);
  
  // Spring(x, y, k, restLength)
  // Bob(x, y, mass)
 
}

function draw() {
  background(220);
  
  // apply gravity
  let gravity = createVector(0, 1);
  
  bob1.applyForce(gravity);
  bob2.applyForce(gravity);
  
  spring1.applySpringForce(bob1);
  spring2.applySpringForce(bob2, bob1);
  
  
  bob1.update();
  bob2.update();
  bob1.show();
  bob2.show();
  
  spring1.show(bob1);
  spring2.show(bob2);
  
}

class Bob{
  constructor(x, y, mass){
    this.position= createVector(x, y);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.topspeed = 3;
    this.damping = 0.98;
    this.mass = mass;
  }
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.mult(this.damping);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  
  applyForce(force){
    let f = force.copy();
    f.div(this.mass); // F = M*A
    this.acceleration.add(f);
  }
  
  
  show(){
    noStroke()
    fill(100);
    circle(this.position.x, this.position.y, 40);
  }
  
}


class Spring{
  constructor(x, y, k, restLength, strokeWeight){
    this.position = createVector(x, y);
    this.k = k;
    this.restLength = restLength;
    this.strokeWeight = strokeWeight;

  }
  

  applySpringForce(bob, otherBob = null){
    // Calculate spring force based on bob position and fixed anchor or another bob's position
    // F = -k*x; x = current length - restLength; current length = vector.mag()
    let force = p5.Vector.sub(bob.position, this.position);
    let currentLength = force.mag();
    let extension = currentLength - this.restLength
    let springForce = force.setMag(-1 * this.k * extension);
    
    // If this spring is connected to another bob, use the second bob’s position
    if (otherBob) {
      this.position = otherBob.position; // Move spring anchor to the other bob's position
    }
    
    bob.applyForce(springForce);
  }

  
  show(bob){
    strokeWeight(this.strokeWeight);
    stroke(0);
    line(this.position.x, this.position.y, bob.position.x, bob.position.y);
  }
}