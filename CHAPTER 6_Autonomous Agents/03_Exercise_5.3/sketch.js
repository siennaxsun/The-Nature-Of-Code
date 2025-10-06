/*Implement a seeking behavior with a moving target, often referred to as pursuit. In this case, your desired vector won’t point toward the object’s current position, but rather its future position as extrapolated from its current velocity. You’ll see this ability for a vehicle to “predict the future” in later examples. The solution is covered in the “Pursue & Evade” video on the Coding Train website.*/

let vehicle;
let target;


function setup() {
  createCanvas(400, 400);
  vehicle = new Vehicle (50, 50);
  target = new Target(300, 250);
}

function draw() {
  background(220);
  
  vehicle.update();
  target.update();
  target.checkEdges();
  
  if (vehicle.isFlee(target)){
    vehicle.flee(target.position);
  }else{
    vehicle.pursue(target);
  }
  
  vehicle.show(target);
  target.show();
}



class Vehicle{
  constructor(x, y){
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.maxspeed = 5;
    this.maxforce = 0.2;
    this.r = 6;
  }
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    // console.log(this.acceleration.copy());
    
  }
  
  seek(target){
    let desiredVelocity = p5.Vector.sub(target, this.position);
    desiredVelocity.setMag(this.maxspeed);
    let steerForce = p5.Vector.sub(desiredVelocity, this.velocity);
    steerForce.limit(this.maxforce);
    this.applyForce(steerForce);
  }
  
  pursue(target){
    let predictionTime = 10;
    // rather than set predictionTime as an arbitrary number, you can relate prediction time with distance:
    // let distance = p5.Vector.dist(this.position, target.position);
    // let predictionTime = distance / this.maxspeed;
    // console.log(predictionTime);

    let futureTargetVelocity = p5.Vector.add(target.position, target.velocity.copy().mult(predictionTime));
    this.seek(futureTargetVelocity);
  }
  
  flee (target){
      let desiredVelocity = p5.Vector.sub(this.position, target);
      desiredVelocity.setMag(this.maxspeed*0.5);
      let fleeForce = p5.Vector.sub(desiredVelocity, this.velocity);
      fleeForce.limit(this.maxforce*2);
      this.applyForce(fleeForce);
  }
  
  isFlee(target){
    let dist = p5.Vector.dist(this.position, target.position);
    if (dist < 50){
      return true;
    }else{
      return false;
    }
  }
  
  applyForce(force){
    this.acceleration.add(force);
  }
  
  show(target){
    
    stroke(0);
    
    if(this.isFlee(target)){
      fill(255, 0, 0);
    }else{
      fill(127);
    }
    
    // The vehicle is a triangle pointing in the direction of velocity.
    let angle = this.velocity.heading();
    
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    beginShape();
    vertex(this.r * 2, 0);
    vertex(-this.r * 2, -this.r);
    vertex(-this.r * 2, this.r);
    endShape(CLOSE);
    pop();
  }
  
}


class Target{
  constructor(x, y){
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.acceleration = createVector(random(-1.0, 1.0), random(-2.0, 1.0));
  }
  
  update(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  
  checkEdges(){
    if (this.position.x>=width){
      this.position.x = 0;
    }else if(this.position.x <= 0){
      this.position.x = width;
    }
    
    if (this.position.y>=height){
      this.position.y = 0;
    }else if(this.position.y <= 0){
      this.position.y = height;
    }
    
  }
  
  show(){
    fill(100);
    strokeWeight(2);
    circle(this.position.x, this.position.y, 50);
  }
}