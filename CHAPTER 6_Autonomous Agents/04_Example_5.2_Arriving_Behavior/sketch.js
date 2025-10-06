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
  console.log(vehicle.acceleration.copy());
  vehicle.arrive(target.position);
  console.log(vehicle.acceleration.copy());
  vehicle.show();
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
  
  arrive(target){
    let desiredVelocity = p5.Vector.sub(target, this.position);
    
    // rather than set desiredVelocity to the maxspeed, relate it to the distance to the target
    // desiredVelocity.setMag(this.maxspeed);
    let dist = desiredVelocity.mag();
    let distThreshold = 100;
    let magnitude = map (dist, 0, distThreshold, 0, this.maxspeed*0.5);
    
    if(dist < distThreshold){
      desiredVelocity.setMag(magnitude);
    }else{
      desiredVelocity.setMag(this.maxspeed);
    }
    
    let steerForce = p5.Vector.sub(desiredVelocity, this.velocity);
    steerForce.limit(this.maxforce);
    this.applyForce(steerForce);
  
  }
  
  applyForce(force){
    this.acceleration.add(force);
  }
  
  show(){
    // The vehicle is a triangle pointing in the direction of velocity.
    let angle = this.velocity.heading();
    fill(127);
    stroke(0);
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