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
  let colorA = 0
  drawVector(pointB, vectA, colorA);
  
  // draw vector B
  let colorB = 255;
  drawVector(pointB, vectB, colorB);

  // show angle value
  noStroke();
  fill(0);
  textSize(16);
  textAlign(LEFT);
  text('Angle: ' + degrees(angle).toFixed(2) + '°', 10, 20);
  text('Angle: ' + radians(angle).toFixed(2) + '°', 10, 40);
  
}


function drawVector(centerPos, vect, color){
  push()
  translate(centerPos);
  rotate(vect.heading());
  
  stroke(color, 0, 0);
  line(0, 0, vect.mag(), 0);
  
  // draw arrows of the vector
  let arrowsize = 6;
  line(vect.mag(), 0, vect.mag() - arrowsize, arrowsize / 2);
  line(vect.mag(), 0, vect.mag() - arrowsize, -arrowsize / 2);
  pop()
}