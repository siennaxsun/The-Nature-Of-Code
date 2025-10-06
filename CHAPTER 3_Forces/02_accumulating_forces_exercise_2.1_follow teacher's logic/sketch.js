let balloon;

function setup() {
  createCanvas(400, 400);
  balloon = new Balloon();
}

function draw() {
  background(220);
  balloon.update();
  balloon.show()
}

class Balloon{
  constructor(){
    this.position = createVector(width/2, height/2);
    // start velocity at 0, 0
    this.velocity = createVector();
    // start acceleration at 0, 0
    this.acceleration = createVector();
    
    // give balloon a small upward force
    this.floatUp = createVector(0, -0.02);
    
    // initiate noise seed (wind come from left or right)
    this.noiseX = 1000;
    // use noise to calculate initial wind force
    this.topspeed = 5;
    this.diameter = height/5;
    this.strokeWeight = 1;
    this.triangleSize = 5;
  }
  
  applyForce(force){
    this.acceleration.add(force);
  }
  
  
  // check reaching edges: if it reaches the top, return true
  shoudBounce(){
    // 1 is the strokeWeight
    return this.position.y - this.diameter/2 - 1 < 0
    // so if this y value is smaller than 0, return true to bounce back
  }
  
  update(){
    // if it reaches the ceiling, then reset y to make sure it's below the ceiling
    if (this.shoudBounce()){
      this.position.y = this.diameter/2 - this.strokeWeight + 2   
      // change the direction: you might wanna do this.acceleration.mult(-1), but you need to lose speed a bit when bouncing
      this.velocity.y *= -0.75
    }
    
    // apply floating upward force
    this.applyForce(this.floatUp);
    
    // apply wind force--use perlin noise to randomly control the wind force
    // wind always blow to the right, sometimes up a bit, sometimes down a bit
    let windX = map(noise(this.noiseX), 0, 1, 0, -0.01);
    let wind = createVector(windX, 0);
    this.applyForce(wind);
    
    // add the sum of acceleration to velocity
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    
    // clear acceleration after bouncing
    this.acceleration.mult(0);
    // add noise over time
    this.noiseX += 0.01;
    // check if the ballon slide off the screen
    this.checkOffScreen();
    
  }
  
  checkOffScreen(){
    if (this.position.x >= width){
      this.position.x = 0;
    }else if (this.position.x <= 0){
      this.position.x = width;
    }
  }
  
  show(){
    stroke(0);
    strokeWeight(this.strokeWeight);
    
    fill(220, 125, 100);
    circle(this.position.x, this.position.y, this.diameter);
    
    // add balloon tie
    const balloonBottomY = this.position.y + this.diameter/2;
    triangle(this.position.x, balloonBottomY, 
             this.position.x + this.triangleSize, balloonBottomY + this.triangleSize,
             this.position.x - this.triangleSize, balloonBottomY + this.triangleSize);
    
    // add string
    line(this.position.x, balloonBottomY + this.triangleSize,
         this.position.x, balloonBottomY + this.triangleSize * 20);
  }
  
  
  
}