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
    this.points = []
    this.pointNum = 8;
    this.points[0] = this.start;
    this.points[this.pointNum-1] = this.end;
    this.addPoints();
  }
  
  
  addPoints(){
    for (let i = 1; i<this.pointNum-1; i++){
      let xOff = random(80, 160);
      let yOff = random(-150, 150);
      let x = this.points[i-1].x + xOff;
      let y = this.points[i-1].y + yOff;
      if (x>=width){
        x = (width - this.points[i-1].x)*0.5 + this.points[i-1].x;
      }
      if (y >= height){
        y = height;
      }else if(y <= 0){
        y = 0;
      }
      this.points[i] = createVector(x, y);
    }
    
  }
  
  
  show(){
    // draw path segments
    for (let i = 0; i<this.pointNum-1; i++){
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
    let normalInfo = this.getShortestNormal(future, path);
    let normalPoint = normalInfo[1];
    let pathEnd = normalInfo[3];
    let pathStart = normalInfo[2]
    let vectB = p5.Vector.sub(pathEnd, pathStart);
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
  
  getShortestNormal(futurePos, path){
    // define a normalDict array to desccribe information related to the normal point, including the length of the normal, the normal point, the starting point of the path and the ending point of the path; // Store arrays of values
    let normalDict = {
        "length": [],
        "pt": [],
        "pathStart": [],
        "pathEnd": []
    };
    
    // loop through all the starting/ending points on the path segments, find the normalPoint for each path segment and to check if the normalPoint is on the path segment line; If it is, then save it to the normalDict[] array
    for (let i = 0; i < path.points.length-1; i++){
      let pathSegStartingPos = path.points[i];
      let pathSegEndingPos = path.points[i+1];
      
      // Safety check: skip if points are too close
      if (p5.Vector.dist(pathSegStartingPos, pathSegEndingPos) < 0.001) {
        continue;
      }
      
      let vectA = p5.Vector.sub(futurePos, pathSegStartingPos);
      let vectB = p5.Vector.sub(pathSegEndingPos, pathSegStartingPos);
      
      // Safety check: ensure vectB is not zero before normalizing
      // if (vectB.mag() < 0.001) {
      //     continue;
      // }
      
      vectB.normalize();
      let normalLength = vectA.dot(vectB);
      
      // Safety check: ensure normalLength is valid
      // if (isNaN(normalLength)) {
      //     continue;
      // }
      
      vectB.setMag(abs(normalLength));
      let normalPoint = p5.Vector.add(pathSegStartingPos, vectB);
      
      // check if the normalPoint is on this line segment by checking if it's colinear, if so, save it to the normal dictionary
      // let pathK = (pathSegEndingPos.y - pathSegStartingPos.y) / (pathSegEndingPos.x - pathSegStartingPos.x);
      // let pathToNormalK = (normalPoint.y - pathSegStartingPos.y) / (normalPoint.x - pathSegStartingPos.x);
      let distFromStartToNormal = p5.Vector.dist(pathSegStartingPos, normalPoint);
      let distFromNormalToEnd = p5.Vector.dist(normalPoint, pathSegEndingPos);
      let distFromStartToEnd = p5.Vector.dist(pathSegStartingPos, pathSegEndingPos);
      if(abs(distFromStartToNormal + distFromNormalToEnd - distFromStartToEnd)<0.01){
          normalDict["length"].push(normalLength);
          normalDict["pt"].push(normalPoint);
          normalDict["pathStart"].push(pathSegStartingPos);
          normalDict["pathEnd"].push(pathSegEndingPos);
           }
    }
    
    // loop through the normal dictionary, to find the normal point with the shortest length
    // return early if no valid normal point found
      if (normalDict["length"].length === 0) {
        return [null, null, null, null];
      }
    
      let shortestNormal = normalDict["length"][0];
      let shortestNormalPoint = normalDict["pt"][0];
      let pathStartPos = normalDict["pathStart"][0];
      let pathEndPos = normalDict["pathEnd"][0];
    
      for (let i = 0; i<normalDict["length"].length; i++){
        let len = normalDict["length"][i];
        if (len < shortestNormal){
          shortestNormal = len;
          shortestNormalPoint = normalDict["pt"][i];
          pathStartPos = normalDict["pathStart"][i];
          pathEndPos = normalDict["pathEnd"][i];
        }
      
      }
    // return multiple values 
      return [shortestNormal, shortestNormalPoint, pathStartPos, pathEndPos]
    
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
