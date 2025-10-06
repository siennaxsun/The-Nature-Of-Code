let pendulum;

function setup() {
  createCanvas(400, 400);
  pendulum = new Pendulum();
}

function draw() {
  background(220);
  
  pendulum.update();
  pendulum.show();
  
  
}


class Pendulum{
  constructor(){
    this.armLength = 100;
    this.angle = 0.25*PI;
    this.angularVelocity = 0;
    this.angularAcceleration= 0;
    this.damping = 0.98;
    this.pivot = createVector(width/2, 80);
    
  }
  
  update(){
    // pendulum acceleration = -g * sin(angle) / armLength
    let g = 0.5;
    this.angularAcceleration = (-1) * g * sin(this.angle) / this.armLength;
    this.angularVelocity += this.angularAcceleration;
    this.angle += this.angularVelocity;
    this.angularVelocity *= 0.98;
    console.log(this.angularAcceleration, this.angle);
  }
  
  show(){
    // bob's position
    let x = this.armLength * sin(this.angle);
    let y = this.armLength * cos(this.angle);
    translate(this.pivot.x, this.pivot.y);
    
    strokeWeight(3);
    fill(200);
    line(0, 0, x, y);
    circle(x, y, 50);
    console.log(x, y);
    
  }
  
  
}