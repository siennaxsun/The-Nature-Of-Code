//Create a sketch that shows the angle between two vectors.


let vectA;
let vectB;
let pointA ;
let pointB ;
let pointC;

function setup() {
  createCanvas(400, 400);
  pointA = createVector(250, 200);
  pointB = createVector(150, 200);
  
  
}

function draw() {
  background(255);
  
  // vectorA from pointB to pointA
  vectA = p5.Vector.sub(pointA, pointB);
  
  // vector B from pointB to pointC
  pointC = createVector(mouseX, mouseY);
  vectB =  p5.Vector.sub(pointC, pointB);
  vectB.setMag(100); // make the vectB's length fixed no matter where the mouse is
  
  
  // calculate the angle between vectA and vectB using dot product
  let angle = vectA.angleBetween(vectB);
  
  // draw vector A
  stroke(0)
  line(pointB.x, pointB.y, pointA.x, pointA.y); // vectorA
  
  // draw vector B
  push()
  translate(pointB.x, pointB.y);
  rotate(vectB.heading());
  stroke(255, 0, 0);
  line(0, 0, vectB.x, vectB.y); // vectorB
  // optionally, draw a small arc to represent the angle
  noFill();
  stroke(0, 100);
  let start = vectA.heading();
  let end = vectB.heading()
  arc(0, 0, 50, 50, min(start, end), max(start, end), OPEN); //  always draw in the positive direction
  pop()
 

  // show angle value
  noStroke();
  fill(0);
  textSize(16);
  textAlign(LEFT);
  text('Angle: ' + degrees(angle).toFixed(2) + '°', 10, 20);
  text('Angle: ' + radians(angle).toFixed(2) + '°', 10, 40);
  
  

  
  
}