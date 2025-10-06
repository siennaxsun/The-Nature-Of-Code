/*/*Write the code for Reynolds’s wandering behavior. Use polar coordinates to calculate the vehicle’s target along a circular path.*/

let vehicle;
// let target;


function setup() {
  createCanvas(400, 400);
  vehicle = new Vehicle (50, 50);
  // target = new Target(300, 250);
  // frameRate(20);
}

function draw() {
  background(220);
  
  
  // vehicle.seek(target.position);
  vehicle.wander();
  vehicle.run();
  // vehicle.update();
  // vehicle.checkEdges();
  // vehicle.show();
  // target.show();
}



class Vehicle{
  constructor(x, y){
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.maxspeed = 5;
    this.maxforce = 0.2;
    this.r = 6;
    this.theta = 0;
  }
  
  run(){
    this.update();
    this.checkEdges();
    this.show();
  }
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);   
    console.log(this.position);
  }
  
  seek(target){
    let desiredVelocity = p5.Vector.sub(target, this.position);
    desiredVelocity.setMag(this.maxspeed);
    let steerForce = p5.Vector.sub(desiredVelocity, this.velocity);
    steerForce.limit(this.maxforce);
    this.applyForce(steerForce);
    
  }
  
  wander(){
    // predicts its future position as a fixed distance in front of it
    let extendedVelocity = this.velocity.copy();
    let newMagnitude = 80;
    extendedVelocity.setMag(newMagnitude);
    let endPoint = p5.Vector.add(this.position, extendedVelocity);
    // draw the line from the current position to the future position
    strokeWeight(4);
    line(this.position.x, this.position.y, endPoint.x, endPoint.y);
    
    // draw the circle from the newly predicted position
    let radius = 50;
    noFill();
    strokeWeight(1);
    circle(endPoint.x, endPoint.y, radius*2)
    // choose a random point on the circle as the desired position
    // let theta = random(-PI, PI);
    this.theta += random(-0.3, 0.3); // this define the changing angle, rather than the rotation angle
    let heading = this.velocity.heading(); // returns the angle (in radians) of the vehicle’s current velocity vector.
    let x = cos(this.theta + heading) * radius;
    let y = sin(this.theta + heading) * radius;
    let randomPos = createVector(x, y).add(endPoint); // turn  point (x, y) from polar coordinate to absolute coordinate
    
    // draw the random point
    noStroke();
    fill(100);
    circle(randomPos.x, randomPos.y, 8);
    
    // calculate the desired vector from the newly predicted position to the random point
    // let desired = p5.Vector.sub(randomPos, this.position);
    // desired.setMag(this.maxspeed);
    
    // calculate the steering force and apply it to the vehicle: steering = desired - currentVelocity
    // let steerForce = p5.Vector.sub(desired, this.velocity);
    // steerForce.limit(this.maxforce);
    // this.applyForce(steerForce);
    
    this.seek(randomPos);
    
    // draw the steerForce vector
    strokeWeight(1);
    stroke(255, 0, 0);
    line(endPoint.x, endPoint.y, randomPos.x, randomPos.y);
  }
  
  applyForce(force){
    this.acceleration.add(force);
    console.log(this.acceleration.copy());
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
  
  checkEdges(){
    if (this.position.x >= width){
      this.position.x = 0;
    }else if(this.position.x <= 0){
      this.position.x = width;
    }
    
    if (this.position.y >= height){
      this.position.y = 0;
    }else if(this.position.y <= 0){
      this.position.y = height;
    }
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
