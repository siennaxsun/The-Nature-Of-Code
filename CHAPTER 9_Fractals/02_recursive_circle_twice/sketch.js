function setup() {
  createCanvas(800, 800);
  background(255);
  
}

function draw() {
  
  stroke(0);
  
  let x = width/2;
  let y = height/2;
  let r = width/2;
  recursiveCircleTwice(x, y, r);
  noLoop();
  
}


function recursiveCircleTwice(x, y, r){
  
  circle(x, y, r*2);
  noFill();
  
  if (r > 4){
    recursiveCircleTwice (x-r, y, 0.5 * r);
    recursiveCircleTwice (x+r, y, 0.5 * r)
  }
}
