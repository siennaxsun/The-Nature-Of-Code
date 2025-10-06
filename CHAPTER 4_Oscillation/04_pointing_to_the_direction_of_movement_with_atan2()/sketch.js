

let mover;

function setup() {
  createCanvas(400, 400);
  mover = new Mover();
  
}

function draw() {
  background(220);
  
  mover.update();
  mover.show();
  mover.checkEdges();

}


class Mover{
  constructor(){
    this.position = createVector(width/2, height/2);
    this.velocity = createVector();
    this.acceleration = 0;
    this.topspeed = 5;
    // this.angle = 0;
    // this.angularVelocity = createVector();
    // this.angularAcceleration = 0;
    this.width = 30;
    this.height = 15;
  }
  
  update(){
    // get the vector from the current position to the mouse position
    let mouse = createVector(mouseX,mouseY);
    let dir = p5.Vector.sub(mouse, this.position); 
    dir.normalize();
    dir.mult(0.5);
    this.acceleration = dir;
    
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    
    // this.angularAcceleration = this.velocity.x * 0.01;
    // this.angularVelocity += this.angularAcceleration;
    // this.angularVelocity = constrain(this.angularVelocity, -0.1, 0.1);
    // this.angle += this.angularVelocity;
    
    this.acceleration.mult(0);
  }
  
  show(){
    let angle = this.velocity.heading();
    fill(150);
    strokeWeight(2);
    
    push();
    rectMode(CENTER);
    translate(this.position.x, this.position.y);
    rotate(angle);
    rect(0, 0, this.width, this.height);
    pop();
    
  }
  
  
  checkEdges(){
    if (this.position.x >= width){
      this.position.x = 0;
    }else if (this.position <= 0){
      this.position.x = width;
    }
    
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
    
  }
}





