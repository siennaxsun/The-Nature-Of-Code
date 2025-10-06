function setup() {
  createCanvas(400, 400);
  
}

function draw() {
  background(220);

  let mouse = createVector(mouseX, mouseY);
  let center = createVector(width/2, height/2);
  
  
  strokeWeight(4);
  stroke(170);
  line(0, 0, center.x, center.y);
  line(0, 0, mouse.x, mouse.y);
  
  mouse.sub(center);
  
  stroke(0);
  // move the origin to (width/2, height/2), the canvas center
  // translate() to visualize the resulting vector as a line from the center (width / 2, height / 2) to the mouse.
  translate(center.x, center.y); 
  line(0, 0, mouse.x, mouse.y);
  
  
}