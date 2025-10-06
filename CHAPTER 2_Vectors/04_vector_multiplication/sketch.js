function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  let center = createVector(width/2, height/2);
  let mouse = createVector(mouseX, mouseY);
  mouse.sub(center);
  
  strokeWeight(2);
  stroke(200);
  translate(center.x, center.y);
  line(0, 0, mouse.x, mouse.y);
  
  mouse.mult(0.5);
  stroke(0);
  strokeWeight(4);
  line(0, 0, mouse.x, mouse.y);
  
}