let radius = 25;
let x = 100;
let y = 100;
let xSpeed = 3;  // Speed of movement in the x-direction
let ySpeed = 2;  // Speed of movement in the y-direction

let position;
let velocity;

function setup() {
  createCanvas(800, 400);
  
  // to change how fast each draw() updates by setting the frame rate to 30 frames per second
  frameRate(120);
  position = createVector(x, y);
  velocity = createVector(xSpeed, ySpeed);
  
  
}

function draw() {
  background(220);
    
//   x = x + xSpeed;
//   y = y + ySpeed;

//   if (x > width || x < 0) {
//     xSpeed = xSpeed * -1;
//   }
//   if (y > height || y < 0) {
//     ySpeed = ySpeed * -1;
//   }
  
  
  position.add(velocity);
  
  if (position.x > width || position.x < 0) {
    velocity.x = velocity.y * -1;
  }
  if (position.y > height || position.y < 0) {
    velocity.y = velocity.y * -1;
  }
  
  // move();
  stroke(0);
  fill(127);
  circle(position.x, position.y, radius);
  print (position.x, position.y);
}

// function move(){
//   x = x + xSpeed;
//   y = y + ySpeed;

//   if (x > width || x < 0) {
//     xSpeed = xSpeed * -1;
//   }
//   if (y > height || y < 0) {
//     ySpeed = ySpeed * -1;
//   }

// }