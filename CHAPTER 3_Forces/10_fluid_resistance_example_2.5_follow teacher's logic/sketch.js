/*- 
First, introduce a new element to the environment: 
a **`Liquid`** object that exerts a drag force when the mover passes through it.
The “liquid” will be drawn as a rectangle, with position, width, and height, and will have a coefficient of drag that sets whether it’s easy for objects to move through it (like air) or difficult (like molasses).
In addition, **`Liquid`** will include a **`show()`** method so we can see the liquid on the canvas:*/


// let moverA;
// let moverB;
let liquid;
let liquidHeight;
let c;
let movers = [];

function setup() {
  createCanvas(800, 400);
  
  // initialize a liquid object
  liquidHeight = height/2;
  c = 0.1;
  liquid = new Liquid(liquidHeight, c);
  
  // initialize an array of evenly-spaced mover objects
  let startingPos = [];
  let spacing = 100;
  for (let i = 100; i < width; i += spacing){
    startingPos.push(i);
  }
  // let massArray = randomIntArray(startingPos.length, 1, 5);
  let diameters = randomIntArray(startingPos.length, 10, 100);
  // associate the mass with the diameters, the bigger the diameter, the heavier
  let massArray = [];
  for (let i = 0; i < startingPos.length; i++){
    let mass = map(diameters[i], 10, 150, 0.5, 5);
    massArray.push(mass);
  }
  
  for (let i = 0; i<startingPos.length; i++){
    let mover = new Mover (startingPos[i], massArray[i], diameters[i]);
    movers.push(mover);
  }
  
}

function randomIntArray(arrayLength, starting, ending){
  let array = [];
  for (let i = 0; i<arrayLength; i++){
    let randomNum = floor(random(starting, ending));
    array.push(randomNum);
  }
  return array;
  
}

function draw() {
  background(250);
  
  liquid.show()
  

  for (let i = 0; i < movers.length; i++){
    let mover = movers[i];
    
    // scale graivty by mover's mass, apply graivty to movers
    let gravity = createVector(0, 0.1);
    let moverGravity = p5.Vector.mult(gravity, mover.mass);
    mover.applyForce(moverGravity);
    
    // get wind vector for each mover, and apply to the mover
    let windX = map(noise(10), 0, 10, 0.2, 1.3);
    let moverWind = createVector(windX, 0); 
    if (mouseIsPressed){    
      mover.applyForce(moverWind);
    }
    
    // apply friction force when movers hit the bottom edge
    if (mover.isOnGround()){
      let c = 0.1;
      let moverFriction = mover.friction(c);
      mover.applyForce(moverFriction);
    }
    
    // apply drag force when mover is inside the liquid
    // calculate the drag force for moverA
    let moverDragForce = liquid.calculateDrag(mover); 
    // if reaching the water tank, then apply the drag force to moverA
    if(liquid.isInLiquid(mover)){
     mover.applyForce(moverDragForce);
    }
    
    // update movers
    mover.update();
    mover.show();
    
  }
  

}


class Liquid{
  constructor(liquidH, c){
    this.height = liquidH;
    this.position = createVector(0, height-this.height);
    this.c = c; 
    // initialize the coefficient in constructor, because the liquid will just always have the same coefficient, no matter what objects are in 
  }
  
  isInLiquid(mover){
    let pos = mover.position;
    // check whether the position vector is within the rectangle defined by the Liquid class.
    return (pos.x > this.position.x && pos.x < this.position.x + width && 
          pos.y > this.position.y && pos.y < this.position.y + this.height);
  }
  
  calculateDrag(mover){
    let speed = mover.velocity.mag(); 
    let dragMag = this.c * speed * speed; // the magnitude of the drag force
    let dragForce = mover.velocity.copy(); // copy the object velocity to the drag force
    dragForce.normalize();
    dragForce.mult(-1);
    dragForce.setMag(dragMag);
    return dragForce
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