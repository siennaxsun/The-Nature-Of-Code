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
  moverA.applyForce(gravity);
  moverB.applyForce(gravity);
  
  // apply windforce to moverA and moverB
  let windX = map(noise(10), 0, 10, 0.2, 1.3);
  let windA = createVector(windX, 0);
  let windB = createVector(windX, 0);
  
  if (mouseIsPressed){    
    moverA.applyForce(windA);
    moverB.applyForce(windB);
  }
  
  
  // update moverA and moverB
  moverA.update();
  moverA.show();
  moverB.update();
  moverB.show();

  
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
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    
    this.bounce();
    
    //reset accleration
    this.acceleration.mult(0);
  }
  
  bounce(){
    if (this.position.y + this.diameter/2 >= height){
      this.velocity.mult(-1);
    }
    
    if (this.position.x + this.diameter/2 >= width){
      this.position.x = width - this.diameter/2;
      this.velocity.x *= -1;
    } else if (this.position.x + this.diameter/2 <= 0){
      this.position.x = this.diameter/2;
      this.velocity.x *= -1;
    }
    
  }
  
  show(){
    fill(200);
    stroke(0);
    strokeWeight(2);
    circle(this.position.x, this.position.y, this.diameter);
  }
}