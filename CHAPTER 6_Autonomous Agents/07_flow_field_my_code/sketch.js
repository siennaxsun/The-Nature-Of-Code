let flowField;

function setup() {
  createCanvas(800, 400);
  
  flowField = new FlowField();
  
}

function draw() {
  background(255);
  flowField.runGrid();
  
}

class FlowField{
  constructor(){
    this.gridSize = 40;
    this.rowNum = floor(height/this.gridSize);
    this.colNum = floor(width/this.gridSize);
    this.vectLength =15;
    
  }
  
  runGrid(){
    this.vectors = []
    this.gridCornerPoints = [];
    this.gridCenterPoints = [];
    this.startPoints = [];
    this.endPoints = [];
    
    this.grid();
    this.createVectors();
    this.show();
  }
  
  grid(){
    for(let i = 0; i < this.rowNum; i++){
      for(let j = 0; j < this.colNum; j++){    
        let x = this.gridSize * j;
        let y = this.gridSize * i;
        let cornerPos = createVector(x, y);
        this.gridCornerPoints.push(cornerPos);     
      }
    }
  }
  
  createVectors(){
    for(let i = 0; i < this.rowNum; i++){
      for(let j = 0; j < this.colNum; j++){
        // Smooth vector animation using Perlin noise--ChatGPT's perlin noise
        // let angle = noise(i * 0.1, j * 0.1, frameCount * 0.01) * TWO_PI;
        // let vect = p5.Vector.fromAngle(angle);
        
        // create completely random vector everyframe
        // let vect = createVector(random(-20, 20), random(-20, 20));
        vect.setMag(this.vectLength);
        let x = this.gridSize * j;
        let y = this.gridSize * i;
        let centerPt = createVector(x + this.gridSize/2, y + this.gridSize/2);
        this.gridCenterPoints.push(centerPt);
        
        let endPt = p5.Vector.add(centerPt, vect.copy().mult(0.5));
        let startPt = p5.Vector.sub(centerPt, vect.copy().mult(0.5));
        this.endPoints.push(endPt);
        this.startPoints.push(startPt);
        
        vect = p5.Vector.sub(endPt, startPt);
        this.vectors.push(vect);
      } 
  }
  }
  
  show(){
    // draw the outer big rectangle
    stroke(0);
    strokeWeight(1);
    rect(0, 0, width, height);
    
    // draw grids
    for (let gridPos of this.gridCornerPoints){
      noFill();
      rect(gridPos.x, gridPos.y, this.gridSize, this.gridSize);
    }
    
    // draw vectors
    for (let i = 0; i < this.vectors.length; i++){
      stroke(255, 0, 0);
      let vect = this.vectors[i];
      let startPos = this.startPoints[i];
      let endPos = this.endPoints[i]

      line(startPos.x, startPos.y, endPos.x, endPos.y);   
      push();
      fill(255, 0, 0);
      circle(endPos.x, endPos.y, 5);
      pop();
    }  
  }
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

