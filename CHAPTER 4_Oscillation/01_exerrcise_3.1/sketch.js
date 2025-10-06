let baton;

function setup() {
  createCanvas(400, 400);
  baton = new Baton(150, 30);
  
}

function draw() {
  background(220);
  
  translate(baton.center.x, baton.center.y);
  baton.rotate();
  
  baton.show();
  

}

class Baton{
  constructor(stemLength, radius){
    this.stemLength = stemLength;
    this.radius = radius;
    this.center = createVector(width/2, height/2);
    this.angle = 0;
  }
  
  rotate(){
    rotate(this.angle);
    this.angle += 0.05;
    // this.center.x = width/2;
    // this.center.y = height/2;
  }
  
  show(){
    strokeWeight(5);
    stroke(100);
    // let stem = line(this.center.x, this.center.y - this.stemLength/2, this.center.x, this.center.y + this.stemLength/2);
    
    strokeWeight(1);
    fill(200);
    // let ballA = circle(this.center.x, this.center.y - this.stemLength/2, this.radius);
    // let ballB = circle(this.center.x, this.center.y + this.stemLength/2, this.radius);
    
    line(0, -this.stemLength / 2, 0, this.stemLength / 2);
    circle(0, -this.stemLength / 2, this.radius);
    circle(0, this.stemLength / 2, this.radius);
    
  }
}