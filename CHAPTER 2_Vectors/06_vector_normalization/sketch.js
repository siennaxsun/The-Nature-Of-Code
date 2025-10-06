function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  center = createVector(width/2, height/2);
  mouse = createVector(mouseX, mouseY);
  
  mouse.sub(center);
  
  stroke(200);
  strokeWeight(2);
  translate(center.x, center.y);
  line(0, 0, mouse.x, mouse.y);
  
  mouse.normalize();
  mouse.mult(30);
  stroke(0);
  strokeWeight(4);
  line(0, 0, mouse.x, mouse.y);
  
}