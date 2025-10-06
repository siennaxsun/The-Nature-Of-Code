

let vehicle;
let wall;
let target;

function setup() {
  createCanvas(400, 400);
  vehicle = new Vehicle (50, 50);
  wall = new Wall(15);
  
}

function draw() {
  background(255);
  // target = new Target(random(width), random(height));
  // vehicle.seek(target.position);
  vehicle.stickWithinWall();
  vehicle.run();
  wall.show();
  // target.show();

}



class Vehicle{
  constructor(x, y){
    this.position = createVector(x, y);
    this.velocity = createVector(3, 4);
    this.acceleration = createVector();
    this.maxspeed = 5;
    this.maxforce = 0.2;
    this.r = 6;
    this.theta = 0;
    this.offset = 25;
  }
  
  run(){
    this.update();
    // this.checkEdges();
    this.show();
  }
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);   
    // console.log(this.position);
  }
  
  seek(target){
    let desiredVelocity = p5.Vector.sub(target, this.position);
    desiredVelocity.setMag(this.maxspeed);
    let steerForce = p5.Vector.sub(desiredVelocity, this.velocity);
    steerForce.limit(this.maxforce);
    this.applyForce(steerForce);
    
  }
  
  
  stickWithinWall(){
    // Start with a null desired velocity.
    let desired = null;
//     let distToTop = this.position.y-wall.thickness;
//     let distToBottom = height-wall.thickness - this.position.y;
//     let distToLeft = this.position.x - wall.thickness;
//     let distToRight = width-wall.thickness-this.position.x;

//     if (distToTop <= this.offset+this.r ){
//       desired = createVector(0, 1);
//     }else if (distToBottom <= this.offset+this.r){
//       desired = createVector(0, -1);
//     }else if (distToLeft <= this.offset+this.r) {
//       desired = createVector(1, 0);
//     }else if (distToRight <= this.offset+this.r ){
//       desired = createVector(-1, 0);
//     }
    
    if (this.position.x < this.offset) {
      desired = createVector(this.maxspeed, this.velocity.y);
    } else if (this.position.x > width - this.offset) {
      desired = createVector(-this.maxspeed, this.velocity.y);
    }
    if (this.position.y < this.offset) {
      desired = createVector(this.velocity.x, this.maxspeed);
    } else if (this.position.y > height - this.offset) {
      desired = createVector(this.velocity.x, -this.maxspeed);
    }
    
    // if desired is not null, then use the desired vector to apply steer force, otherwise, do seek(target)
    if (desired){
      desired.setMag(this.maxspeed);
      let steerForce = p5.Vector.sub(desired, this.velocity);
      steerForce.limit(this.maxforce);
      this.applyForce(steerForce);
    }
    // else{
    //   this.seek(target.position);
    // }
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

class Wall{
  constructor(thickness){
    this.thickness = thickness;
  }
  
  show(){
    fill(0)
    rectMode(CENTER);
    rect(width/2, 0, width, this.thickness);
    rect(width/2, height, width, this.thickness);
    rect(0, height/2, this.thickness, height);
    rect(width, height/2, this.thickness, height);
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
