let path;
let vehicleA;
let vehicleB;

function setup() {
  createCanvas(800, 400);
  
  newPath();
  
  vehicleA = new Vehicle(path.getStart().x, path.getStart().y, random(2, 5), random(0.2, 0.8));
  vehicleB = new Vehicle(path.getStart().x, path.getStart().y, random(2, 5), random(0.2, 0.8));
  
}

function draw() {
  background(220);
  
  vehicleA.run(path);
  vehicleA.followPath(path);
  
  vehicleB.run(path);
  vehicleB.followPath(path);

  path.show();

}


function newPath(){
  path = new Path();
  
  path.addPoints(-20, height/2);
  path.addPoints(random(0, width / 2), random(0, height));
  path.addPoints(random(width / 2, width), random(0, height));
  path.addPoints(width + 20, height / 2);
}

//----------------------------------------------------------------------
class Path{
  constructor(){
    this.radius = 30;
    this.points = []
  }
  
  
  addPoints(x, y){
    let point = createVector(x, y);
    this.points.push(point); 
  }
  
  getStart(){
    return this.points[0];
  }
  
  getEnd(){
    return this.points[this.points.length-1];
  }
  
  
  show(){
    // draw path segments
    for (let i = 0; i<this.points.length-1; i++){
      let posA = this.points[i];
      let posB = this.points[i+1];
      
      // thick stroke
      strokeWeight(this.radius * 2);
      stroke(0, 100);
      line(posA.x, posA.y, posB.x, posB.y);
      
      // think line segments
      stroke(0);
      strokeWeight(1);
      line(posA.x, posA.y, posB.x, posB.y);
    }
  }
}

//----------------------------------------------------------------------
class Vehicle{
  constructor(x, y, maxspeed, maxforce){
    this.position = createVector(x, y);
    this.velocity = createVector(3, 2);
    this.acceleration = createVector();
    this.maxspeed = maxspeed || 4; // Set this.maxspeed to the value of ms, but if ms is falsy, use 4 instead
    this.maxforce = maxforce || 0.1;
    this.size = 5;
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
    let target = null;
    let normal = null;
    let worldRecord = Infinity; // start with a very high record distance that can easily be beaten
    
    // loop through all the path segments' points
    for (let i = 0; i<path.points.length-1; i++){
      let a = path.points[i];
      let b = path.points[i+1];
      
      // get the normal point to that line
      let normalPoint = this.getNormalPoint(future, a, b);
      
      // test if this normal point is on the path segment by checking the boundary
      if (normalPoint.x < a.x || normalPoint.x > b.x){
        normalPoint = b.copy()
      }
      
      // check the distance from the future pos to the normal point
      let distance = p5.Vector.dist(future, normalPoint);
      
      // find the smallest distance
      if (distance < worldRecord){
        worldRecord = distance;
        // if so, the target to steer towards is this normal point
        normal = normalPoint;
        target = normalPoint.copy();
        
        // look at the direction of the line segment, so we can seek a liitle bit ahead of the normal
        let dir = p5.Vector.sub(b, a);
        dir.setMag(10); // here is arbitrarily assign a number, should be based on distance to path and velocity
        target.add(dir);
      }
    }
    
    
    // only if the distance is greater than the path's radius, do we bother to steer
    if (worldRecord > path.radius && target !== null){
      this.seek(target);
    }
    
    // draw the line from future pos to normal pos
    strokeWeight(1);
    line(this.position.x, this.position.y, future.x, future.y)
    line(future.x, future.y, normal.x, normal.y)
  }
  
  getNormalPoint(p, a, b){
    // vector from a to p
    let ap = p5.Vector.sub(p, a);
    // vector from a to b
    let ab = p5.Vector.sub(b, a);
    ab.normalize();
    
    ab.mult(ap.dot(ab));
    let normalPoint = p5.Vector.add(a, ab);
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
      this.position.y = path.getStart().y;
    }
  }
  
  
}
