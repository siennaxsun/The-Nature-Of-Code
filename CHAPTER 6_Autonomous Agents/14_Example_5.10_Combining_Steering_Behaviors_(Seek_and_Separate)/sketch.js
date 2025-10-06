

let vehicles = [];

function setup() {
  createCanvas(800, 400);
  
  for (let i = 0; i<25; i++){
    vehicles[i] = new Vehicle(random(width), random(height));
  }

  
}

function draw() {
  background(220);

  for (let vehicle of vehicles){
    vehicle.applyBehaviors(vehicles);
    vehicle.run();
    
  }
}



//----------------------------------------------------------------------
class Vehicle{
  constructor(x, y, maxspeed, maxforce){
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.maxspeed = maxspeed || 3; // Set this.maxspeed to the value of ms, but if ms is falsy, use 4 instead
    this.maxforce = maxforce || 0.2;
    this.size = 12;
  }
  
  run(){
    this.update();
    this.checkEdges();
    this.show();
  }
  
  applyBehaviors(vehicles){
    let separate = this.separate(vehicles);
    let seek = this.seek(createVector(mouseX, mouseY));
    
    // you can adjust these forces
    separate.mult(1.5);
    seek.mult(0.5);
    
    this.applyForce(separate);
    this.applyForce(seek);
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
    // this.applyForce(steer);
    return steer;
  }
  
  applyForce(force){
    this.acceleration.add(force);
    // console.log(this.acceleration.copy());
  }
  
  separate(vehicles){
    // loop through the neighboring vehicles' list, find their distance to the current vehicle
    let distThreshold = this.size * 2; // how close is too close
    let summedDir = createVector();
    let count = 0;
    for (let other of vehicles){
      let dist = p5.Vector.dist(this.position, other.position);
      if (this !== other && dist < distThreshold){
        let dir = p5.Vector.sub(this.position, other.position);
        dir.normalize();
        dir.div(dist); // The closer it is, the more the vehicle should flee. The farther, the less. So the magnitude is set to be inversely proportional to the distance.
        summedDir.add(dir);
        count+=1;

      }
    }
    

    if (count > 0){
      // summedDir.div(count);
      summedDir.setMag(this.maxspeed);
      // Implement Reynolds: Steering = Desired - Velocity
      let steer = p5.Vector.sub(summedDir, this.velocity);
      steer.limit(this.maxforce);
      // this.applyForce(steer);
      return steer;
    }else{
      return createVector();
    }
    
  }
  
  
  cohere(vehicles){
    let distThreshold = this.size * 50;
    let summedDir = createVector();
    let count = 0;
    for (let other of vehicles){
      let dist = p5.Vector.dist(this.position, other.position);
      if (this != other && dist > distThreshold){
        // let dir = p5.Vector.sub(other.position, this.position);
        // dir.setMag(dist/(this.size*3));
        // summedDir.add(dir);
        summedDir.add(other.position);
        count++;
      }
    }
    
    if (count>0){
      // summedDir.setMag(this.maxspeed);
      // let steer = p5.Vector.sub(summedDir, this.velocity);
      // this.applyForce(steer);
      
      let avgPos = summedDir.div(count);
      this.seek(avgPos); // cleaner than duplicating seek logic
    }
    
  }
  
  

  show(){
    fill(127);
    stroke(0);
    push();
    translate(this.position.x, this.position.y);
    circle(0, 0, this.size);
    pop();
  }
  
  checkEdges(){
    if(this.position.x+this.size >= width){
      this.position.x = this.size;
    }else if(this.position.x-this.size <= 0){
      this.position.x = width-this.size;
    }
    if (this.position.y + this.size >=height){
      this.position.y = this.size;
    }else if (this.position.y - this.size <= 0){
      this.position.y = height-this.size;       
    }
  }
  
  
}
