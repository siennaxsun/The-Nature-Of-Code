
let emitter;
let repeller;

function setup() {
  createCanvas(400, 400);
  emitter = new Emitter (width/2, 100);
  repeller = new Repeller(width/2, 300);
}

function draw() {
  background(220);
  
   emitter.addParticles();
  
  let gravity = createVector(0, 0.1);
  emitter.applyForce(gravity);
  
  emitter.applyRepeller(repeller);
  
  emitter.run()
  
  repeller.show();
  
}

class Emitter{
  constructor(x, y){
    this.emitters = [];
    this.position = createVector(x, y);

  }
  
  addParticles(){
    // let emitter = new Particle(this.position.x, this.position.y);
    // this.emitters.push(emitter);
    
    let emitter;
    let r = random(0, 1);
    if (r<0.5){
      emitter = new Particle(this.position.x, this.position.y);     
    }else{
      emitter = new Confetti(this.position.x, this.position.y);
    }
    this.emitters.push(emitter);
    
  }
  
  run(){
    for (let i = this.emitters.length-1; i>=0; i--){
      let emitter = this.emitters[i];
      emitter.run();
      if (emitter.isDead()){
        this.emitters.splice(i, 1);
      }
    }
  }
  
  applyForce(force){
    for(let emitter of this.emitters){
      emitter.applyForce(force);
    }
  }
  
  applyRepeller(repeller){
    for (let emitter of this.emitters){
      let force = repeller.calculateRepelForce(emitter);
      emitter.applyForce(force);
      // console.log(force);
    }
  }
}


class Particle{
  constructor(x, y){
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.acceleration = createVector();
    this.lifespan = 255;
    this.mass = 1;
  }
  
  run(){
    // let gravity = createVector(0, 0.1);
    this.update();
    // this.applyForce(gravity);
    this.show();
  }
  
  update(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 2.0;
    
  }
  
  applyForce(force){
    let f = force.copy();
    // f = m * a
    f.div(this.mass);
    this.acceleration.add(f);
  }
  
  isDead(){
    if(this.lifespan >0){
      return false;
    }else{
      return true;
    }
  }
  
  show(){
    fill(20, this.lifespan);
    stroke(0, this.lifespan);
    circle(this.position.x, this.position.y, 10);
  }
}


class Confetti extends Particle{
  constructor(x, y){
    super(x, y);
    this.angularVelocity = 0;
    this.angularAcceleration = 0.001;
    this.angle = 0;
  }
  
  update(){
    super.update();
    this.angularVelocity+=this.angularAcceleration;
    this.angle += this.angularVelocity;
  }
  
  show(){
    fill(100, this.lifespan);
    stroke(0, this.lifespan);
    
    // let angle = map(this.position.x, 0, width, 0, TWO_PI * 2);
    
    push()
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    rectMode(CENTER);
    square(0, 0, 20);
    pop();
  }
}


class Repeller{
  constructor(x, y){
    // A Repeller doesn’t move, so you just need position.
    this.position = createVector(x, y);
    // Instead of mass, use the concept of power to scale the repellent force.
    this.strength = 150;
  }
  
  calculateRepelForce(particle){
    let force = p5.Vector.sub(this.position, particle.position);
    let dist = force.mag();
    dist = constrain(dist, 5, 50);
    let strength = (-1 * this.strength) / (dist * dist);
    force.setMag(strength);
    return force;
    
  }
  
  show(){
    fill(200);
    stroke(0);
    circle(this.position.x, this.position.y, 20);
    
  }
}