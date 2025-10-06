let emitter;
let particle;
let x = 200;
let y = 30;

function setup() {
  createCanvas(400, 400);
  
  emitter = new Emitter(x, y);

}

function draw() {
  background(255);
  particle = new Particle(x, y);
  emitter.addParticles(particle);
  emitter.run();
      
}


class Emitter{
  constructor(x, y){
    this.particles = [];
    this.origin = createVector(x, y)
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