function setup() {
  createCanvas(800, 800);
  background(255);
  
}

function draw() {

  let x = width/2;
  let y = height/2;
  let r = width/2;
  recursiveCircleTwice(x, y, r);
  noLoop();
  
}


function recursiveCircleTwice(x, y, r){
  stroke(0);
  noFill();
  
  circle(x, y, r*2);
  
  if (r > 8){
    recursiveCircleTwice (x-r/2, y, 0.5 * r);
    recursiveCircleTwice (x+r/2, y, 0.5 * r);
    recursiveCircleTwice (x, y-r/2, 0.5 * r);
    recursiveCircleTwice (x, y+r/2, 0.5 * r);
  }
}
