let particles = [];
let num = 30;

function setup() {
  createCanvas(400, 400);
  
//   for (let i= 0; i < num; i++){
//     particles[i] = new Particle(width/2, 30);
//   }
  
}

function draw() {
  background(255);
  
  // create a new particle and add it to the array during every draw() iteration
  let newParticle = new Particle(width/2, 30);
  particles.push(newParticle);
  
  let gravity = createVector (0, 0.2);
  
  for (let i = 0; i < particles.length; i++){
    // Operate the single particle.
    particles[i].run(gravity);
    }
    
  particles = particles.filter(function(particle) {
    // Keep particles that are not dead!
    return !particle.isDead();
  });
      
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