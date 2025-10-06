let mover;
let moverImage;
let trainW = 64;
let sleeperSize = 5;

function preload(){
  moverImage = loadImage('images/train.png');
}

function setup() {
  createCanvas(800, 400);
  // Place the train at the center to start.
  // The "position" of the image is at the top left corner,
  // which is why we need to subtract half the width
  // and all of the height to get it perfectly centered.
  const startingPosition = createVector(width/2 - trainW/2, height/2 - trainW -1);
  mover = new Mover(moverImage, startingPosition);
}

function keyPressed(){
  mover.keyPressed();
}

function draw() {
  background(220);
  
  // railroad
  fill(0);
  line(0, height / 2, width, height / 2);
  for (let i = 0; i < width - sleeperSize; i += sleeperSize * 3) {
    rect(i, height / 2, sleeperSize, sleeperSize / 2);
  }

  
  // moving vehicle
  mover.update();
  mover.show();
  // keyPressed()
  // mover.checkEdges();
 
  
}

// function keyPressed(){
//   if (keyCode === UP_ARROW) {
//     mover.velocity.add(mover.acceleration);
//     // console.log("UP key is being pressed");
//   } else if (keyCode === DOWN_ARROW) {
//     mover.velocity.sub(mover.acceleration);
//     // console.log("DOWN key is being pressed");
//   }
  
//   console.log("Key pressed: ", key, keyCode, "| The Speed", mover.velocity.mag());
// }

class Mover{
  constructor(image, startingPosition){
    this.image = image;
    this.position = startingPosition;
    this.velocity = createVector(1, 0); // move from left to right
    this.acceleration = createVector(0, 0);
    this.topspeed = 10;

  }
  
  update(){
    this.velocity.add(this.acceleration);
    // this.keyPress();
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    
    // make it stop 
    if (this.velocity.x <= 0){
      this.velocity.x = 0;
      this.acceleration.x = 0;
    }
    
    this.checkEdges();
  }
  
  show(){
    // fill (100);
    // circle(this.position.x, this.position.y, 25);
    
    image(this.image, this.position.x, this.position.y, trainW, trainW);
  }
  
  checkEdges(){
    if (this.position.x >= width){
      this.position.x = -trainW;
    } else if (this.position.x <= -trainW){
      this.position.x = width;
    }
    
    // if (this.position.y >= height){
    //   this.position.y = 0;
    // } else if (this.position.y <= 0){
    //   this.position.y = height;
    // }
  }
  
  keyPressed(){
    if (keyCode === UP_ARROW) {
      this.acceleration.x += 0.1;
  } else if (keyCode === DOWN_ARROW) {
      this.acceleration.x -= 0.1;
  }
    
    console.log("Key pressed: ", key, keyCode, "| The Speed", this.velocity.mag().toFixed(3));
}
  
  

  
// keyPress() {
//   if (keyIsDown(UP_ARROW)) {
//     this.velocity.add(this.acceleration);
//   } 
//   if (keyIsDown(DOWN_ARROW)) {
//     this.velocity.sub(this.acceleration);
//   }
//   console.log("Key pressed: ", key, keyCode, "| The Speed", this.velocity.mag().toFixed(3));
// }
}