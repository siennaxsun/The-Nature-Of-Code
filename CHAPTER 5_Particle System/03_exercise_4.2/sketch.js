/*Add angular velocity (rotation) to the particle, and design a particle that isn’t a circle so its rotation is visible.*/


let particle;

function setup() {
  createCanvas(400, 400);
  particle = new Particle(width/2, 50);
}

function draw() {
  background(255);
  
  // apply gravity
  let gravity = createVector (0, 0.2);
  // particle.applyForce(gravity);
  
  // Operate the single particle.
  particle.run(gravity);
  
  // Check the particle’s state and make a new particle.
  if (particle.isDead()){
    particle = new Particle(width/2, 50);
    console.log("Particle dead!")
  }
  
}


class Particle{
  constructor(x, y){
    this.position = createVector(x, y);
    // give it a random velocity
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.acceleration = createVector();
    // A new variable to keep track of how long the particle has been “alive.”
    this.lifespan = 255;
    
    // add angular velocity
    this.angle = 0;
    this.angularVelocity = 0;
    this.angularAcceleration = random(-0.01, 0.01);
  }
  
  run(force){
    this.update();
    this.applyForce(force);
    this.show();
  }
  
  update(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    
    this.angularVelocity+=this.angularAcceleration;
    this.angle += this.angularVelocity;
    this.angularVelocity *= 0.99; 
    
    this.lifespan -= 2.0;
  }
  
  isDead(){
    if (this.lifespan > 0){
      return false
    }else{
      return true;
    }
  }
  
  applyForce(force){
    let f = force;
    this.acceleration.add(f);
  }
  
  show(){
    // Since the life ranges from 255 to 0, it can also be used for alpha.
    fill(0, this.lifespan);
    stroke(0, this.lifespan);
    
    push()
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    
    rectMode(CENTER);
    rect(0, 0, 20, 10);
    pop()
    
    
  }
}