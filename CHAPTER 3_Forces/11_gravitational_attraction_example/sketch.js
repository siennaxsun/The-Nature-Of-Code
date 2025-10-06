let attractor;
let mover;
let G = 3;

function setup() {
  createCanvas(400, 400);
  
  let attractorMass = 20;
  let moverMass = 2;
  
  attractor = new Attractor(attractorMass);
  mover = new Mover(random(0, width), random(0, height), moverMass);
  
}

function draw() {
  background(220);
  
  // show attractor
  attractor.show();
  
  // apply the gravitational attraction force between the two
  // let g = 0.3;
  // let force = mover.calculateGravitationalAttraction(attractor);
  let force = attractor.calculateGravitationalAttraction(mover)
  mover.applyForce(force);
  
  // apply gravity
  // let gravityX = map(mover.mass, 0, 10, 0, 1);
  // let gravity = createVector(0, gravityX);
  // mover.applyForce(gravity);
  
  mover.update();
  mover.show();
}


class Mover{
  constructor(x, y, mass){
    this.position = createVector(x, y);
    this.mass = mass;
    this.velocity = createVector(3, 0);
    this.acceleration = createVector();
    this.topspeed = 5;
    this.diameter = sqrt(this.mass) * 20;
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
    
    // reset acceleartion
    this.acceleration.mult(0);
  }
  
  show(){
    fill (100);
    circle(this.position.x, this.position.y, this.diameter);
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