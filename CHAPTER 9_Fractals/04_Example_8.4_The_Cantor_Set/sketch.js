function setup() {
  createCanvas(400, 400);
  background(255);
}

function draw() {
  
  // use center points to draw cantor line sets
  // let centerX = width/2;
  // let centerY = 50;
  // let length = width;
  // drawCantorLines(centerX, centerY, length);
  
  // use end points to draw cantor line sets
  let length = width;
  let startX = 0;
  let startY = 50;
  drawCantor(startX, startY, length)
  noLoop();
  
}


// use center points to draw cantor line sets
function drawCantorLines(centerX, centerY, length){
  stroke(0);
  strokeWeight(2);
  
  let offset = length * 0.1;
  let leftEndX = centerX - length/2;
  let leftEndY = centerY;
  let rightEndX = centerX + length/2;
  let rightEndY = centerY;
  line(leftEndX, leftEndY, rightEndX, rightEndY);
  
  if (length > 5){
    let newLeftMidX = ( centerX-offset+leftEndX) * 0.5;
    let newRightMidX = (rightEndX + centerX+offset) * 0.5;
    let newLength = (length-offset*2)* 0.5;
    drawCantorLines(newLeftMidX, centerY+30, newLength);
    drawCantorLines(newRightMidX, centerY+30, newLength);
    
  }
}

// use end points to draw cantor line sets
function drawCantor(startX, startY, length){
  stroke(0);
  strokeWeight(2);
  let endX = startX + length;
  line(startX, startY, endX, startY);
  
  if (length > 5){
    let midX = (startX + endX)/2;
    let offset = length * 0.1;
    let newLen = (length - offset*2)/2
    startY += offset;
    drawCantor(startX, startY, newLen);
    drawCantor(midX+offset, startY, newLen);
  }
  
}