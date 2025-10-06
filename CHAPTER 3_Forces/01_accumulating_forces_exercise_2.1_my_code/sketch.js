/*
Using forces, simulate a helium-filled balloon floating upward and bouncing off the top of a window. Can you add a wind force that changes over time, perhaps according to Perlin noise?
*/


let balloon;

function setup() {
  createCanvas(400, 400);
  balloon = new Balloon();
}

function draw() {
  background(220);
  
  balloon.show();
  balloon.floating();
  balloon.bounceOffEdges();
}

class Balloon{
  constructor(){
    this.position = createVector(width/2, height/2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.topspeed = 5;
  }
  
  show(){
    fill(220, 125, 100);
    circle(this.position.x, this.position.y, 50);
  }
  
  // add forces
  applyForce(force){
    this.acceleration.add(force);
  }
  
  floating(){   
    let floatUp = createVector(0, -0.02);
    let gravity = createVector(0, 0.01);
    let windX = map(noise(0.01), 0, 1, 0, 0.1);
    let wind = createVector (windX, 0);
    
    // add floating force
    this.applyForce(floatUp);
    // add gravity
    this.applyForce(gravity);
    // add wind
    this.applyForce(wind);
    
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    
    // Reset acceleration each frame (Newton’s 2nd law: F = ma)
    this.acceleration.mult(0);
    

  
  }
  
  
  bounceOffEdges(){
    if (this.position.y <= 0 || this.position.y >= height ){
      // this.acceleration.mult(-1);
      this.velocity.mult(-1);
    } 
    
    if (this.position.x <= 0 ){
      // this.acceleration.mult(-1);
      this.position.x = width;
    } else if(this.position.x >= width){
      this.position.x = 0;
    }
  }
  
  
  
  // applyForce(force){
  //   for (let i = 0; i)
  //   let wind = map(noise(10), 0, 100, 0, 1);
  //   this.acceleration.add(force);
  // }
}