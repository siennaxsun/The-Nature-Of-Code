let walkers = [];
let numberOfWalkers = 10;
let speed = 300;


function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < numberOfWalkers; i++){
    let walkerWidth = width/numberOfWalkers;
    let walkerX = i * walkerWidth;
    walkers.push(new Walker(walkerWidth, walkerX));
    
  }
  
}

function draw() {
  background(220);
  for (let i = 0; i < numberOfWalkers; i++){
    walkers[i].show();
    walkers[i].step();
  }
  
}

class Walker{
  constructor(walkerWidth, walkerX){
    this.x = walkerX;
    this.y = height;
    this.walkerWidth = walkerWidth;
  }
  
  show(){
    stroke(0);
    fill(125)
    rect(this.x, this.y, this.walkerWidth, height);
  }
  
  step(){
    let stepY = random(0, height/speed);
    this.y -= stepY;
    this.stop();
  }
  
  stop(){
    if (this.y <= 0){
      this.y = 0;
    }
  }
  
  
}