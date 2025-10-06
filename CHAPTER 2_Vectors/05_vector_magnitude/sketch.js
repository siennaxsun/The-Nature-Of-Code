function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  let mouse = createVector(mouseX, mouseY);
  let center = createVector(width/2, height/2);
  
  mouse.sub(center);
  let  length = mouse.mag();
  strokeWeight(10);
  stroke(0);
  line(20, 20, 20+length, 20);
  
  
  strokeWeight(2);
  stroke(200);
  translate(center.x, center.y);
  line(0, 0, mouse.x, mouse.y);
  
}