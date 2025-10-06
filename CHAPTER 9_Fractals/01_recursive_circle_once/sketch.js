function setup() {
  createCanvas(800, 800);
  background(255);
}

function draw() {
  
  stroke(0);
  
  let r = width/2;
  recursiveCircleOnce(r);
  
}


function recursiveCircleOnce(r){
  circle(width/2, height/2, r*2);
  
  if (r > 4){
    recursiveCircleOnce (0.8 * r)
  }
}
