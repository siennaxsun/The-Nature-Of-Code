/*
Let’s incorporate this idea of angular motion into the Mover class. 
*/


let attractor;
let movers = [];
let G = 3;
let numOfMovers = 10;

function setup() {
  createCanvas(400, 400);
  
  let attractorMass = 20;
  let moverMass = 2;
  
  // initialize the attractor
  attractor = new Attractor(attractorMass);
  // mover = new Mover(random(0, width), random(0, height), moverMass);
  
  // initialize the movers
  for (let i = 0; i < numOfMovers; i ++){
    let moverMass = random(0.5, 5);
    let mover = new Mover(random(0, width), random(0, height), moverMass);
    movers.push(mover);
  }
  
}

function draw() {
  background(220);
  
  // show attractor
  attractor.show();
  
  
  
  for (let i = 0; i < numOfMovers; i++){
    // apply the gravitational attraction force between the two
    let force = attractor.calculateGravitationalAttraction(movers[i])
    movers[i].applyForce(force);
    
    // update and show movers
    movers[i].update();
    movers[i].show();
    
  }
  
  
  
  
}


class Mover{
  constructor(x, y, mass){
    this.position = createVector(x, y);
    this.mass = mass;
    this.velocity = createVector(3, 0);
    this.acceleration = createVector();
    this.topspeed = 5;
    this.diameter = sqrt(this.mass) * 20;
    this.angle = 0;
    this.angularVelocity = 0;
    this.angularAcceleration = 0.001;
    // this.angularAcceleration = this.acceleration.y * 0.001;
  }
  
  applyForce(force){
    // A = F/M;
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }
  
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    
    // update rotation angles
    this.angularAcceleration = this.acceleration.x * 0.01;
    this.angularVelocity += this.angularAcceleration;
    this.angularVelocity = constrain(this.angularVelocity, -0.1, 0.1);
    this.angle += this.angularVelocity;
    
    // reset acceleartion
    this.acceleration.mult(0);
  }
  

  
  show(){
    fill (100);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    circle(0, 0, this.diameter);
    line(0, 0, this.diameter/2, 0);
    pop();
  }
  
  
}


class Attractor{
  constructor(mass){
    this.position = createVector(width/2, height/2);
    this.mass = mass;
    this.diameter = sqrt(this.mass) * 20;
  }
  
  calculateGravitationalAttraction(mover){
    // get the force from mover to attractor
    let force = p5.Vector.sub(this.position, mover.position);
    // get the distance between the two
    let distance = force.mag() 
    // constrain the distance to avoid the extreme weak/strong forces
    distance = constrain(distance, 5, 25);
    // get the magnitude/strength of the force
    let magnitude = (G * this.mass * mover.mass) / (distance * distance);
    // set the force in the magnitude
    force.setMag(magnitude);
    
    return force;
  }
  
  show(){
    fill(200);
    strokeWeight(2);
    circle(this.position.x, this.position.y, this.diameter);
  }
  
}