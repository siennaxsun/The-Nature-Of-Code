
let emitter;

function setup() {
  createCanvas(400, 400);
  emitter = new Emitter (width/2, 30);
}

function draw() {
  background(220);
  
  emitter.addParticles(emitter.position.x,   emitter.position.y);
  emitter.run()
  

  
}

class Emitter{
  constructor(x, y){
    this.emitters = [];
    this.position = createVector(x, y);
    // this.num = 10;
  }
  
  addParticles(x, y){
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
}




class Particle{
  constructor(x, y){
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.acceleration = createVector();
    this.lifespan = 255;
  }
  
  run(){
    let gravity = createVector(0, 0.1);
    this.update();
    this.applyForce(gravity);
    this.show();
  }
  
  update(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 2.0;
    
  }
  
  applyForce(force){
    this.acceleration.add(force);
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

// create a Confetti subclass that extends Particle. 
// instead of being circle, I wanna make it square
// also wanna make it rotate--when the particle’s x-position is 0, its rotation should be 0; when its x-position is equal to the width, its rotation should be equal to 4π

class Confetti extends Particle{
  constructor(x, y){
    super(x, y);
  }
  
  show(){
    fill(100, this.lifespan);
    stroke(0, this.lifespan);
    
    let angle = map(this.position.x, 0, width, 0, TWO_PI * 2);
    
    push()
    translate(this.position.x, this.position.y);
    rotate(angle);
    rectMode(CENTER);
    square(0, 0, 20);
    pop();
  }
}