

let moverA;
let moverB;


function setup() {
  createCanvas(800, 400);
  
  let massA = 1;
  let massB = 2;
  let startingPosA = width/2 - 300;
  let startingPosB = width/2 + 300;
  let diameterA = 50;
  let diameterB = 100;
  
  moverA = new Mover(startingPosA, massA, diameterA);
  moverB = new Mover(startingPosB, massB, diameterB);
}

function draw() {
  background(220);
  
  // apply gravity to moverA and moverB
  let gravity = createVector(0, 0.1);
  // scale gravity by moverA's mass
  let gravityA = p5.Vector.mult(gravity, moverA.mass);
  // scale gravity by moverB's mass
  // let gravityB = p5.Vector.mult(gravity, moverB.mass);
  
  moverA.applyForce(gravityA);
  // moverB.applyForce(gravityB);
  
  // apply windforce to moverA and moverB
//   let windX = map(noise(10), 0, 10, 0.2, 1.3);
//   let windA = createVector(windX, 0);
//   let windB = createVector(windX, 0);
  
//   if (mouseIsPressed){    
//     moverA.applyForce(windA);
//     moverB.applyForce(windB);
//   }
  
  // apply friction when the moves contact the bottom edge:
  let c = 0.1; // coefficient of the friction force
  let normal = 1; // the magnitude of the normal force
  let frictionMag = c*normal; // the magnitude of the friction force
  let friction = moverA.velocity.copy();
  friction.normalize();
  friction.mult(-1);
  friction.setMag(frictionMag);
  if (moverA.isOnGround()){
    moverA.applyForce(friction);
  }
  
  
/*
  // apply a push back force from the edge of the wall
  let distanceThreshold = 30;
  let distanceA = abs(moverA.position.y + moverA.diameter/2 - height);
  let distanceB = abs(moverB.position.y + moverB.diameter/2 - height);
  
  if (distanceA < distanceThreshold){
    let pushbackAX = map(distanceA, 0, distanceThreshold, 0, 2 * moverA.mass);
    let pushbackA = createVector(0, pushbackAX*(-1));
    moverA.applyForce(pushbackA);
    // moverA.velocity.y *= 0.7;
  }
  
  if (distanceB < distanceThreshold){
    let pushbackBX = map(distanceB, 0, distanceThreshold, 0, 2 * moverB.mass);
    let pushbackB = createVector(0, pushbackBX*(-1));
    moverB.applyForce(pushbackB);
    // moverB.velocity.y *= 0.7;
  }
  */
  
  // update moverA and moverB
  moverA.update();
  moverA.show();
  // moverB.update();
  // moverB.show();

  
}


class Mover{
  constructor(startingPosX, mass, diameter){
    this.diameter = diameter;
    this.position = createVector(startingPosX, 20 + this.diameter/2);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.topspeed = 5;
    this.mass = mass
  }
  
  applyForce(force){
    let f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
    
  }
  
  update(){
    
    this.velocity.add(this.acceleration);
    // this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    
    this.bounce();
    
    //reset accleration
    this.acceleration.mult(0);
  }
  
  isOnGround() {
    return this.position.y + this.diameter / 2 >= height;
  }
  
  bounce(){
    let bounce = 0.9;
    if (this.position.y + this.diameter/2 >= height){
      this.position.y = height-this.diameter/2;
      // simulates the ball losing energy each time it hits the ground.
      this.velocity.y *= -1*bounce;
    }
    
    // if (this.position.x + this.diameter/2 >= width){
    //   this.position.x = width - this.diameter/2;
    //   this.velocity.x *= -1;
    // } else if (this.position.x + this.diameter/2 <= 0){
    //   this.position.x = this.diameter/2;
    //   this.velocity.x *= -1;
    // }
    
  }
  
  show(){
    fill(200);
    stroke(0);
    strokeWeight(2);
    circle(this.position.x, this.position.y, this.diameter);
  }
}