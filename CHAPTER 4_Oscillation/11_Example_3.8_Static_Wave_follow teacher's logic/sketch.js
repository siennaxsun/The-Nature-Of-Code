




// array of circles:
let spacing = 20;
let deltaAngle = 0.5;
let startAngle = 0;
let amplitude = 100;

function setup() {
    createCanvas(400, 400);
  
  
    // frameRate(5);
  
  // for (let x = 0; x < width; x += spacing){
  //     y = amplitude * sin(angle);
  //     angle += deltaAngle;
  //     circle(x, y+height/2, 50);
  //   }



}

function draw() {
  
  background(220);
  
  let angle = startAngle;
  
  for (let x = 0; x < width; x += spacing){
    y = amplitude * sin(angle);
    angle += deltaAngle;
    circle(x, y+height/2, 50);
    }
  
  startAngle += 0.5;

}