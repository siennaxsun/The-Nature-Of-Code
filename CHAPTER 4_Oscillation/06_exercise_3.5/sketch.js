/*Using Example 3.4 as a basis, draw a spiral path. Start in the center and move outward. Note that this can be done by changing only one line of code and adding one line of code!*/

let radius = 10;
let theta = 0;
let magnitude = 0;
let magnitudeIncrement = 0.5;

function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  strokeWeight(2);
  fill(0);
  
  let position = p5.Vector.fromAngle(theta);
  magnitude += magnitudeIncrement;
  position.mult(magnitude);
  
  // let x = sin(theta) * (stringLength+ballRadius);
  // let y = cos(theta) * (stringLength+ballRadius);
  translate(width/2, height/2);
  circle(position.x, position.y, radius*2);
  theta += 0.05;
  
}