/*- 
First, introduce a new element to the environment: 
a **`Liquid`** object that exerts a drag force when the mover passes through it.
The “liquid” will be drawn as a rectangle, with position, width, and height, and will have a coefficient of drag that sets whether it’s easy for objects to move through it (like air) or difficult (like molasses).
In addition, **`Liquid`** will include a **`show()`** method so we can see the liquid on the canvas:*/


let moverA;
let moverB;
let liquid;
let liquidHeight;

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
  
  liquidHeight = height/2
  liquid = new Liquid(liquidHeight);
}


function draw() {
  background(250);
  
  liquid.show()
  
  // apply gravity to moverA and moverB
  let gravity = createVector(0, 0.1);
  // scale gravity by moverA's mass
  let gravityA = p5.Vector.mult(gravity, moverA.mass);
  // scale gravity by moverB's mass
  let gravityB = p5.Vector.mult(gravity, moverB.mass);
  
  moverA.applyForce(gravityA);
  moverB.applyForce(gravityB);
  
  
  // apply windforce to moverA and moverB
  let windX = map(noise(10), 0, 10, 0.2, 1.3);
  let windA = createVector(windX, 0);
  let windB = createVector(windX, 0);
  
  if (mouseIsPressed){    
    moverA.applyForce(windA);
    moverB.applyForce(windB);
  }
  
  
  // apply friction force
  if (moverA.isOnGround()){
    let cOfA = 0.1;
    let frictionA = moverA.friction(cOfA);
    moverA.applyForce(frictionA);
  }
  if (moverB.isOnGround()){
    let cOfB = 0.2;
    let frictionB = moverB.friction(cOfB);
    moverB.applyForce(frictionB);
  }
  
  
  // apply drag force when reaching the water tank
  let c = 0.1; //coefficient of the drag force
  let speed = moverA.velocity.mag(); 
  let dragMag = c * speed * speed; // the magnitude of the drag force
  
  let dragForce = moverA.velocity.copy(); // copy the object velocity to the drag force
  dragForce.normalize();
  dragForce.mult(-1);
  dragForce.setMag(dragMag);
  // if reaching the water tank, then apply the drag force
  if(moverA.position.y + moverA.diameter/2 >= height-liquidHeight){
     moverA.applyForce(dragForce);
     }
  

  
  // update moverA and moverB
  moverA.update();
  moverA.show();
  moverB.update();
  moverB.show();

}

class Liquid{
  constructor(liquidH){
    this.height = liquidH;
    this.position = createVector(0, height-this.height);
  }
  
  show(){
    fill(200);
    noStroke();
    rect(this.position.x, this.position.y, width, this.height);
  }
  
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
  
  friction(coefficient){
    let friction;
    if (this.velocity.mag() < 0.01) {
      // effectively no motion, skip friction 
      friction = createVector(0, 0);
      return friction;
    }  else{
      let c = coefficient; // coefficient of the friction force 
      let normal = 1; // the magnitude of the normal force
      let frictionMag = c * normal; // the magnitude of the friction force 
      friction = this.velocity.copy();
      friction.normalize();
      friction.mult(-1);
      friction.setMag(frictionMag);
      return friction;
    }

    
    
  }
  
  update(){
    
    this.velocity.add(this.acceleration);
    // this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    
    this.bounce();
    
    //reset accleration
    this.acceleration.mult(0);
  }
  
  isOnGround() {
    return this.position.y + this.diameter / 2 >= height;
  }
  
  bounce(){
    let bounce = 0.9;
    if (this.position.y + this.diameter/2 >= height){
      this.position.y = height-this.diameter/2;
      // simulates the ball losing energy each time it hits the ground.
      this.velocity.y *= -1*bounce;
    }
    
    // if (this.position.x + this.diameter/2 >= width){
    //   this.position.x = width - this.diameter/2;
    //   this.velocity.x *= -1;
    // } else if (this.position.x + this.diameter/2 <= 0){
    //   this.position.x = this.diameter/2;
    //   this.velocity.x *= -1;
    // }
    
  }
  
  show(){
    fill(200);
    stroke(0);
    strokeWeight(2);
    circle(this.position.x, this.position.y, this.diameter);
  }
}