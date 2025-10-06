
let walker;

function setup() {
  createCanvas(400, 400);
  background(220);
  walker = new Walker();
}

function draw() {
  walker.show();
  walker.move();
  
}

class Walker{
  constructor(){
    this.tx = 0;
    this.ty = 10000;
  }
  
  show(){
    fill(120);
    stroke(0);
    ellipse(this.x, this.y, 25, 25);
  }
  
  move(){
    let nx = noise(this.tx);
    let ny = noise(this.ty);
    this.x = map(nx, 0, 1, 0, width);
    this.y = map(ny, 0, 1, 0, height);
    this.tx += 0.01;
    this.ty += 0.01;
  }
}