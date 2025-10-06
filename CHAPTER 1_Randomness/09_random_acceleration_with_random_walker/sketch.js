
let walker;

function setup() {
  createCanvas(800, 400);
  walker = new Walker();
}

function draw() {
  background(220);
  walker.show();
  walker.move();
  
}

class Walker{
  constructor(){
    // this.tx = 0;
    // this.ty = 10000;
    
    this.position = createVector(random(0, width), random(0, height));
    this.velocity = createVector();
    this.acceleration = createVector();
    this.topspeed = 5;
  }
  
  show(){
    fill(120);
    stroke(0);
    ellipse(this.position.x, this.position.y, 25, 25);
  }
  
  move(){
    // let nx = noise(this.tx);
    // let ny = noise(this.ty);
    // this.x = map(nx, 0, 1, 0, width);
    // this.y = map(ny, 0, 1, 0, height);
    // this.tx += 0.01;
    // this.ty += 0.01;
    
    this.acceleration = p5.Vector.random2D();
    this.acceleration.mult(random(2));
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    
    // check edges
    if (this.position.x > width){
      this.position.x = 0;
    }else if (this.position.x<0){
      this.position.x = width;
    }
    
    if (this.position.y > height){
      this.position.y = 0;
    }else if (this.position.y<0){
      this.position.y = height;
    }
    
    console.log(this.position.x, this.position.y);
    
  }
}