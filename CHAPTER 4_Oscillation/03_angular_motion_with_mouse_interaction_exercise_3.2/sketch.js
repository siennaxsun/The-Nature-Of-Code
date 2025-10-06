/*Add an interaction to the spinning baton. How can you control the acceleration with the mouse? Can you introduce the idea of drag, decreasing the angular velocity over time so the baton eventually comes to rest?*/


let stemLength = 150;
let radius = 35;
let angle = 0;
let angularVelocity = 0;
let angularAcceleration = 0.001;
let isDragging = false;

function setup() {
  createCanvas(400, 400);
  
}

function draw() {
  background(220);
  
  translate(width/2, height/2);
  rotate(angle);
  
  stroke(100);
  fill(200);
  line(0, -stemLength/2, 0, stemLength/2);
  circle(0, -stemLength/2, radius);
  circle(0, stemLength/2, radius);
  
  angularVelocity += angularAcceleration;
  angle += angularVelocity;
  
  //angularVelocity *= 0.99; // Always apply dampening
  console.log(angularAcceleration, angularVelocity);
  
  
  //   if (isDragging) {
  //   angularAcceleration = -0.05;
  // } else {
  //   angularAcceleration = 0.001;
  // }

  // angularVelocity += angularAcceleration;
  // angle += angularVelocity;
  // angularVelocity *= 0.99;
  // console.log(isDragging, angularAcceleration, angularVelocity);


}

// function mousePressed() {
//   isDragging = true;
// }

// function mouseReleased() {
//   isDragging = false;
// }




function mouseDragged(){
  // Control acceleration with horizontal mouse movement
  // let force = (mouseX - width / 2) * 0.0005;  // small scaling factor
  angularAcceleration = -0.001;

}

function mouseReleased(){
  angularAcceleration = 0.001;
}



/*

class Baton{
  constructor(stemLength, radius){
    this.stemLength = stemLength;
    this.radius = radius;
    this.center = createVector(width/2, height/2);
    this.angle = 0;
  }
  
  rotate(){
    rotate(this.angle);
    this.angle += 0.05;
    // this.center.x = width/2;
    // this.center.y = height/2;
  }
  
  show(){
    strokeWeight(5);
    stroke(100);
    // let stem = line(this.center.x, this.center.y - this.stemLength/2, this.center.x, this.center.y + this.stemLength/2);
    
    strokeWeight(1);
    fill(200);
    // let ballA = circle(this.center.x, this.center.y - this.stemLength/2, this.radius);
    // let ballB = circle(this.center.x, this.center.y + this.stemLength/2, this.radius);
    
    line(0, -this.stemLength / 2, 0, this.stemLength / 2);
    circle(0, -this.stemLength / 2, this.radius);
    circle(0, this.stemLength / 2, this.radius);
    
  }
}

*/