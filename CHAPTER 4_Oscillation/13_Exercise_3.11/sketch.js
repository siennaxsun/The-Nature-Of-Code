/* Encapsulate the wave-generating code into a Wave class, and create a sketch that displays two waves (with different amplitudes/periods), as shown in the following image. Try moving beyond plain circles and lines to visualize the wave in a more creative way. What about connecting the points by using beginShape(), endShape(), and vertex()?*/


// array of circles:
let moverA;
let moverB;

function setup() {
    createCanvas(400, 400);
  
    let startYPosA = 50;
    let startYPosB = 250;
    moverA = new Mover(startYPosA);
    moverB = new Mover(startYPosB);
}

function draw() {
  
  background(220);
  
  
  moverA.show();
  moverB.show()

}



class Mover{
  constructor(startY){
    this.spacing = 10;
    this.deltaAngle = 0.2;
    this.startAngle = 0;
    this.amplitude = 100;
    this.startYPos = startY;
    this.startAngleVelocity = 0.03;
  }
  

  show(){  
    let angle = this.startAngle;
 
    for (let x = 0; x < width; x += this.spacing){
      let y = this.amplitude * sin(angle);
      angle += this.deltaAngle;
      
      blendMode(MULTIPLY);
      
      fill(150, 150, 150, 100);
      stroke(1);
      circle(x, y+this.startYPos, 50);

      blendMode(BLEND);
    }
  
    this.startAngle += this.startAngleVelocity;
    
  }
  
}