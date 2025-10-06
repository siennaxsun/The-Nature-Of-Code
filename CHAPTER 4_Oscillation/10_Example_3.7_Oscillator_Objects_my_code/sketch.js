/*using angle that increments with the angular veolocity*/

let oscillators = [];
let num = 10;

function setup() {
    createCanvas(400, 400);
    
    for (let i = 0; i < num; i++){
      let angularVelocityX = random(-0.05, 0.05);
      let angularVelocityY = random(-0.05, 0.05);
      let amplitudeX = floor(random(50, width/2));
      let amplitudeY = floor(random(100, height/2));
      oscillators[i] = new Oscillator(angularVelocityX, angularVelocityY, amplitudeX, amplitudeY);
    }
    
}

function draw() {
    background(220);
    
  for (let i = 0; i < num; i++){
    oscillators[i].update();
    oscillators[i].show();
  }
    
}

class Oscillator{
  constructor(angularVelocityX, angularVelocityY, amplitudeX, amplitudeY){
    this.position = createVector(0, 0);
    this.velocity = createVector();
    this.acceleration = createVector(0.01, 0.01);
    
    this.diameter = 35;
    
    this.angleX = 0;
    this.angularVelocityX = angularVelocityX;
    // this.angularAcceleration = 0.05;
    
    this.angleY = 0;
    this.angularVelocityY = angularVelocityY;
    
    
    this.amplitudeX = amplitudeX;
    this.amplitudeY = amplitudeY;
  }
  
  update(){
    // this.velocity.add(this.acceleration);
    // this.position.add(this.velocity);
    // this.acceleration.mult(0);
    
    // this.angularVelocity += this.angularAcceleraton;
    this.angleX += this.angularVelocityX;
    this.angleY += this.angularVelocityY;
    // this.angle= map(this.angle, 0, TWO_PI, 0, 2);
    this.position.x = this.amplitudeX * sin(this.angleX);
    this.position.y = this.amplitudeY * sin(this.angleY);
    console.log(this.angleX, this.position.x);
  }
  
  show(){
    fill(200);
    strokeWeight(2);
    
    push()
    translate(width / 2, height/2);
    line(0, 0, this.position.x, this.position.y);
    circle(this.position.x, this.position.y, this.diameter);
    pop();
  }
  
  
}