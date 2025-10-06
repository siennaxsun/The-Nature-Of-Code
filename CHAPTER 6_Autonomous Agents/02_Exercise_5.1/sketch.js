/*Implement a fleeing steering behavior (the desired velocity is the same as seek, but pointed in the opposite direction).*/

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
  
  // dist(x1, y1, x2, y2) to calcuate two points' distance
  // let dist = dist(vehicle.position.x, vehicle.position.y, target.position.x, target.position.y);
  // let dist = p5.Vector.sub(vehicle.position, target.position).mag();
  // console.log(dist);
  
  if (vehicle.isFlee(target)){
    vehicle.flee(target.position);
  }else{
    vehicle.seek(target.position);
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
  }
  
  show(){
    fill(100);
    strokeWeight(2);
    circle(this.position.x, this.position.y, 50);
  }
}