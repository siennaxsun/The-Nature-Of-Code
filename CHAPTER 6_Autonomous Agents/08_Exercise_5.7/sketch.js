/*Adapt the flow-field example so the vectors change over time. (Hint: Try using the third dimension of Perlin noise!)*/

let flowField;
let vehicles = [];
let num = 100;

function setup() {
  createCanvas(800, 400);
  
  flowField = new FlowField();
  
  for (let i = 0; i < num; i++ ){
    let maxspeed = random(2, 5);
    let maxforce = random(0.1, 0.5);
    vehicles[i] = new Vehicle(random(width), random(height), maxspeed, maxforce);
  }
  
  
}

function draw() {
  background(255);
  
  flowField.createVectors();
  flowField.show();
  
  for (let vehicle of vehicles){
    vehicle.follow(flowField);
    vehicle.run();
  }
  
}




class FlowField{
  constructor(){
    this.gridSize = 20;
    this.rowNum = floor(height/this.gridSize);
    this.colNum = floor(width/this.gridSize);
    this.vectLength =10;
    // use 2D array to create an empty data structure first
    this.fields = new Array(this.colNum);
    for (let i = 0; i < this.rowNum; i++){
      this.fields[i] = new Array(this.colNum);
    }
    this.createVectors(); // if you put a method inside constructor, then when you create an instance of this class, this method will be called automatically. 
    this.zOff = 0;
    
  }
  
  // generate vectors
  createVectors(){
    // Reseed noise for a new flow field each time.
    // noiseSeed(random(10000));
    
    // use 3D perlin noise to generate smooth vector fields
    // let zOff = 0;
    for(let i = 0; i < this.rowNum; i++){
      let xOff=0;  
      for(let j = 0; j < this.colNum; j++){
        let yOff = 0;
        // 3D perlin noise
        let angle = map(noise(xOff, yOff, this.zOff), 0, 1, 0, PI*4);
        this.fields[i][j] = p5.Vector.fromAngle(angle).setMag(this.vectLength);
        yOff += 0.1;
      } 
      xOff += 0.1;
    }
    this.zOff+=0.005;
  }
  
  // Draw every vector
  show() {
    for (let i = 0; i < this.rowNum; i++) {
      for (let j = 0; j < this.colNum; j++) {
        let w = width / this.colNum;
        let h = height / this.rowNum;
        let v = this.fields[i][j].copy();
        v.setMag(w * 0.5);
        
        let x = j * w + w / 2;
        let y = i * h + h / 2;
        
        strokeWeight(1);
        line(x, y, x + v.x, y + v.y);
      }
    }
  }
  
  // a function to return the vector where the vehicle's position is
  lookup(position){
    // find the column and row index based on vehcile's position
    let columnIndex = constrain(floor(position.y / this.gridSize), 0, this.colNum-1);
    let rowIndex = constrain(floor(position.x / this.gridSize), 0, this.rowNum-1);
    return this.fields[rowIndex] [columnIndex].copy();
 
  }
 
}

class Vehicle{
  constructor(x, y, maxspeed, maxforce){
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector();
    this.maxspeed = maxspeed;
    this.maxforce = maxforce;
    this.r = 6;
    this.theta = 0;
    this.offset = 25;
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
  
  follow(flow){
    let desired = flow.lookup(this.position);
    desired.setMag(this.maxspeed);
    let steerForce = p5.Vector.sub(desired, this.velocity);
    steerForce.limit(this.maxforce);
    this.applyForce(steerForce);
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

