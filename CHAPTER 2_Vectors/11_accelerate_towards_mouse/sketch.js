
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
    this.position = createVector(width/2, height/2);
    this.velocity = createVector();
    this.acceleration = createVector(0, 0);
    this.topspeed = 10;
  }
  
  show(){
    fill(120);
    stroke(0);
    ellipse(this.position.x, this.position.y, 25, 25);
  }
  
  move(){
    
    let mouse = createVector(mouseX, mouseY);
    
    // step 1: compute direction
    let direction = p5.Vector.sub(mouse, this.position);
    
    // Step 2: Calculate the target magnitude based on the distance from the mouse (which is the same as the magnitude of the direction vector)
    let distance = direction.mag();
    let newMagnitude = map(distance, 0, max(width, height), 0, 0.2);
    direction.setMag(newMagnitude);
    
    // step 3: set the acceleration with the direction
    this.acceleration = direction;
    
    // step 4: update the position based on the velocity, which is further based on acceleration
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    
    // check edges
    if (mouse.x > width){
      this.position.x = 0;
    }else if (mouse.x<0){
      this.position.x = width;
    }
    
    if (mouse.y > height){
      this.position.y = 0;
    }else if (mouse.y<0){
      this.position.y = height;
    }
    
    console.log(this.acceleration.mag(), this.velocity.mag());
    
  }
}