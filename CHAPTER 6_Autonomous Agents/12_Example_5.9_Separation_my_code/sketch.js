
let vehicles = [];

function setup() {
  createCanvas(800, 400);
  
  for (let i = 0; i<100; i++){
    vehicles[i] = new Vehicle(random(width), random(height), random(5, 7), random(0.5, 1));
  }

  
}

function draw() {
  background(220);
  // Safety check
  if (!vehicles || !Array.isArray(vehicles)) {
    console.error("vehicles is not properly initialized");
    return;
  }
  
  for (let vehicle of vehicles){
    // let vehicle = vehicles[i];
    // let neighbors = vehicles.slice(0, i).concat(vehicles.slice(i + 1));
    let neighbors = vehicles.filter(other => other !== vehicle)
    vehicle.separate(neighbors);
    vehicle.run();
    
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
  
  separate(neighbors){
    // loop through the neighboring vehicles' list, find their distance to the current vehicle
    let distThreshold = 20; // how close is too close
    let steeringVelocity = []
    for (let neighbor of neighbors){
      let dir = p5.Vector.sub(neighbor.position, this.position);
      let dist = dir.mag();
      if (dist < distThreshold){
        let reversedDir = dir.copy().normalize().mult(-1);
        // reversedDir.div(dist);
        // reversedDir.mult(-1);
        steeringVelocity.push(reversedDir);
      }
    }
    
    // find the averaged velocity
    let avgDir;
    if (steeringVelocity.length > 0){
      let summedDir = createVector();
      for (let velocity of steeringVelocity){
        summedDir.add(velocity);
      }
      avgDir = summedDir.div(steeringVelocity.length)
      avgDir.setMag(this.maxspeed);
      
      // apply this separation force from the averaged velocity
      let steer = p5.Vector.sub(avgDir, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
    
    
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
  
  checkEdges(){
    if(this.position.x+this.size >= width){
      this.position.x = -this.size;
      // this.position.y = path.getStart().y;
    }
  }
  
  
}
