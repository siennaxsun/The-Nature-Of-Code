/*
expand the code to include one Attractor and an array of many Mover objects, just as I included an array of Mover objects in Example 2.5 previously.
*/


let bodyA
let bodyB;
let bodies = [];
let G = 3;
let numOfObjects = 10;

function setup() {
  createCanvas(400, 400);
  
  let bodyAMass = 4;
  let bodyBMass = 1;
  
  // initialize the attractor
  bodyA = new Body(random(0, width), random(0, height), bodyAMass);
  bodyB = new Body(random(0, width), random(0, height), bodyBMass);
  
  // initialize the movers
//   for (let i = 0; i < numOfMovers; i ++){
//     let moverMass = random(0.5, 5);
//     let mover = new Mover(random(0, width), random(0, height), moverMass);
//     movers.push(mover);
//   }
  
}

function draw() {
  background(220);
  
  // apply the gravitational attraction force between the two
  let forceA = bodyA.calculateGravitationalAttraction(bodyB)
  bodyA.applyForce(forceA);
  
  let forceB = bodyB.calculateGravitationalAttraction(bodyA)
  bodyB.applyForce(forceB);
  
  bodyA.update();
  bodyB.update();
  bodyA.show();
  bodyB.show()

  
//   for (let i = 0; i < numOfMovers; i++){
//     // apply the gravitational attraction force between the two
//     let force = attractor.calculateGravitationalAttraction(movers[i])
//     movers[i].applyForce(force);
    
//     // update and show movers
//     movers[i].update();
//     movers[i].show();
//   }
  
  
  
  
}


class Body{
  constructor(x, y, mass){
    this.position = createVector(x, y);
    this.mass = mass;
    this.velocity = createVector(1, 0);
    this.acceleration = createVector();
    this.topspeed = 5;
    this.diameter = sqrt(this.mass) * 20;
  }
  
  applyForce(force){
    // A = F/M;
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }
  
  calculateGravitationalAttraction(body){
    // get the force from mover to attractor
    let force = p5.Vector.sub(this.position, body.position);
    // get the distance between the two
    let distance = force.mag() 
    // constrain the distance to avoid the extreme weak/strong forces
    distance = constrain(distance, 5, 25);
    // get the magnitude/strength of the force
    let magnitude = (G * this.mass * body.mass) / (distance * distance);
    // set the force in the magnitude
    force.setMag(magnitude);
    
    return force;
  }
  
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    this.position.x = constrain(this.position.x, 0, width);
    this.position.y = constrain(this.position.y, 0, height);
    
    // reset acceleartion
    this.acceleration.mult(0);
  }
  
  show(){
    fill (100);
    circle(this.position.x, this.position.y, this.diameter);
  }
  
}

/*
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
*/