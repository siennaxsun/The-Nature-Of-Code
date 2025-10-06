let stringLength = 90;
let ballRadius = stringLength/3;
let theta = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  strokeWeight(2);
  fill(200);

  // method 1: not using the conversion method
  // push();
  // translate(width/2, height/2);
  // rotate(theta);
  // line(0, 0, 0, stringLength);
  // circle(0, stringLength + ballRadius, ballRadius*2);
  // theta += 0.05;
  // pop();
  
  
  // method 2: using the polar-cartesian conversion to get the updated (x, y) of the ball's center
  theta += 0.05;
  let x = sin(theta) * (stringLength+ballRadius);
  let y = cos(theta) * (stringLength+ballRadius);
  
  translate(width/2, height/2);
  line(0, 0, x, y);
  circle(x, y, ballRadius*2);

  
}