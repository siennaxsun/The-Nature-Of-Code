/*What if the emitter moves? Can you emit particles from the mouse position, or use the concepts of velocity and acceleration to move the system autonomously?
*/


let emitter;
let particle;

function setup() {
  createCanvas(400, 400);
  
  emitter = new Emitter(width/2, 30);

}

function draw() {
  background(255);
  particle = new Particle(emitter.origin.x, emitter.origin.y);
  emitter.addParticles(particle);
  emitter.run();
  emitter.update();
      
}


class Emitter{
  constructor(x, y){
    this.particles = [];
    this.origin = createVector(x, y)
    this.velocity = createVector();
    this.acceleration = createVector(random(-1, 1), random(0, 1));
  }
  
  addParticles(p){
    this.particles.push(p);
  }
  
  run(){
    let length = this.particles.length-1;
    let gravity = createVector(0, 0.1);
    
    for (let p of this.particles){
      p.run(gravity);
    }
    
    this.particles = this.particles.filter(function(p){
      return !p.isDead();
    })
  }
  
  update(){
    this.velocity.add(this.acceleration);
    this.origin.add(this.velocity);
    this.acceleration.mult(0);
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
    
  }
  
  run(force){
    this.update();
    this.applyForce(force);
    this.show()
  }
  
  update(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    
    this.acceleration.mult(0);
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
    fill(100, this.lifespan);
    stroke(0, this.lifespan);
    circle(this.position.x, this.position.y, 10);
    
  }
}