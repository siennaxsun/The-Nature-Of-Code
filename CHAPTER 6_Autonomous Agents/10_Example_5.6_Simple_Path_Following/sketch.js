let path;
let vehicleA;
let vehicleB;

function setup() {
  createCanvas(800, 400);
  
  path = new Path();
  vehicleA = new Vehicle(path.start.x, path.start.y, random(2, 5), random(0.2, 0.8));
  vehicleB = new Vehicle(path.start.x, path.start.y, random(2, 5), random(0.2, 0.8));
  
}

function draw() {
  background(220);
  
  vehicleA.run(path);
  vehicleA.followPath(path);
  
  vehicleB.run(path);
  vehicleB.followPath(path);
  
  path.show();

}


//----------------------------------------------------------------------
class Path{
  constructor(){
    this.start = createVector(0, height/3);
    this.end = createVector(width, height*2/3);
    this.radius = 30;
    
  }
  
  show(){
    // if you wanna the stroke to be at the back, then you need to draw the stroke first, then the thin line
    strokeWeight(this.radius * 2);
    stroke(0, 100);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
    
    stroke(0);
    strokeWeight(1);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
    
    
    
    
    
  }
}

//----------------------------------------------------------------------
class Vehicle{
  constructor(x, y, maxspeed, maxforce){
    this.position = createVector(x, y);
    this.velocity = createVector(3, 2);
    this.acceleration = createVector();
    this.maxspeed = maxspeed;
    this.maxforce = maxforce;
    this.size = 5;
    this.theta = 0;
    this.offset = 25;
  }
  
  run(path){
    this.update();
    this.checkEdges(path);
    this.show();
  }
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);   
  }
  
  followPath(path){
    // Step 1: Predict the vehicle’s future position.
    let future = this.velocity.copy();
    future.setMag(25);
    future.add(this.position);
    
    // Step 2: Find the normal point along the path.
    let normalPoint = this.getNormal(future, path);
    let vectB = p5.Vector.sub(path.end, path.start);
    vectB.setMag(25); // arbitraraily pick a point on the path that is ahead of the normal point
    
    // step 3: find a target on the path if vehicle is steering away from the path
    let dist = p5.Vector.dist(future, normalPoint); 
    if(dist > path.radius){
      // steer backwards
      // vectB now has a length of 25 pixels, then add to the normalPoint, so that you can get a point starting from normalPoint, with the same vectB's direction, at the length of 25
      let target = p5.Vector.add(normalPoint, vectB);  
      this.seek(target);
    }
    
    // draw the line from future pos to normal pos
    strokeWeight(1);
    line(this.position.x, this.position.y, future.x, future.y)
    line(future.x, future.y, normalPoint.x, normalPoint.y)
  }
  
  getNormal(futurePos, path){
    let vectA = p5.Vector.sub(futurePos, path.start);
    let vectB = p5.Vector.sub(path.end, path.start);
    vectB.normalize();
    vectB.setMag(vectA.dot(vectB))
    let normalPoint = p5.Vector.add(path.start, vectB) ;
    return normalPoint;
  }
  
  seek(target){
    let desire = p5.Vector.sub(target, this.position);
    // If the magnitude of desired equals 0, skip out of here
    // If the magnitude (length) of the desired vector is zero, then exit the seek() function immediately.
    if (desire.mag() === 0) return;
    desire.setMag(this.maxspeed);
    let steer = p5.Vector.sub(desire, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  applyForce(force){
    this.acceleration.add(force);
    // console.log(this.acceleration.copy());
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
    vertex(this.size *2, 0);
    vertex(-this.size*2 , -this.size);
    vertex(-this.size*2, this.size);
    endShape(CLOSE);
    pop();
  }
  
  checkEdges(path){
    if(this.position.x+this.size >= width){
      this.position.x = -this.size;
      this.position.y = path.start.y;
    }
  }
  
  
}
