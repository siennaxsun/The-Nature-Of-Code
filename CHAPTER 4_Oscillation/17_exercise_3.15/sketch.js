/*
String together a series of pendulums so that the bob of one is the pivot point of another. Note that doing this may produce intriguing results but will be wildly inaccurate physically. Simulating an actual double pendulum requires sophisticated equations. You can read about them in the Wolfram Research article on double pendulums or watch my video on coding a double pendulum.
*/

let pendulumA;
let pendulumB;
let pivot;
let points = [];

function setup() {
  createCanvas(400, 400);
  
  // Pendulum(length, angle);
  let lengthA = 100;
  let angleA = 0.5 * PI;
  pendulumA = new Pendulum(lengthA, angleA);
  
  let lengthB = 60;
  let angleB = 0.85 * PI;
  pendulumB = new Pendulum(lengthB, angleB);
  
  pivot = createVector(width/2, 80);
}

function draw() {
  background(220);
  
  
  pendulumA.update();
  pendulumB.update();
  
  let bob1 = pendulumA.show(pivot)
  let bob2 = pendulumB.show(bob1);
  
  console.log(pendulumB.angle);
  
  // drawing the curves
  points.push(bob2);
  
  stroke(0);
  strokeWeight(0.5);
  
  // for (let i = 0; i<points.length-1; i++){
  //   
  //   line(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
  // }
  
  beginShape();
  for (let pt of points) {
    vertex(pt.x, pt.y);
}
  endShape();
  
}


class Pendulum{
  constructor(length, angle){
    this.armLength = length;
    this.angle = angle;
    this.angularVelocity = 0;
    this.angularAcceleration= 0;
    this.damping = 0.98;
    this.gravity = 0.5;
    // this.pivot = createVector(x, y);
    // this.bob = createVector(x, y+this.armLength);
  }
  
  update(){
    // pendulum acceleration = -g * sin(angle) / armLength
    this.angularAcceleration = (-1) * this.gravity * sin(this.angle) / this.armLength;
    this.angularVelocity += this.angularAcceleration;
    this.angle += this.angularVelocity;
    
    // If near vertical (swing complete), reset to a random new angle
    if (abs(this.angle) < 0.01 && abs(this.angularVelocity) < 0.05) {
      this.angle = random(-PI, PI);
      this.angularVelocity = 0; // reset velocity to prevent compounding
  }
    // apply damping effect
    this.angularVelocity *= 0.998;
    
  }
  
  // here pivot refers to the objects that the pendulum is connected to. It could be a fixed point, or a moving bob
  show(pivot){
    // bob's position relative to its pivot point
    let x = this.armLength * sin(this.angle);
    let y = this.armLength * cos(this.angle);
    
    // convert from polar to cartesian coordinate 
    let bob = createVector(x, y);
    bob.add(pivot);
    
    strokeWeight(3);
    fill(200);
    line(pivot.x, pivot.y, bob.x, bob.y);
    circle(bob.x, bob.y, 20);
    
    return bob;
  }
  
  
  
  
}