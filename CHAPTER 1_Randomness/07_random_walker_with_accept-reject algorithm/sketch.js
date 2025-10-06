// Declare a Walker object in the global scope
let walker;

//in p5.js, setup() is executed once when the sketch starts.
function setup() {
    createCanvas(640, 240);
    // Create the walker.
    walker = new Walker();
    background(255);// you need to put background() in the setup(), otherwise, it wil not be draw, because background will be cleared at each iteration of draw
}

//{!1} Then draw() loops forever and ever (until you quit).
function draw() {
    // Call functions on the walker.
    walker.step();
    walker.show();
}

// create an accept-reject algorithm to find a qualitying value based on y = x*x
function acceptReject(){
  while(true){
    let r1 = random(1);
    let probability = r1 * r1;
    let r2 = random(1);
    if (r2 < probability){
      return r1;
    }
    
  }
}

// create the class
class Walker {
    // Objects have a constructor where they are initialized.
    constructor() {
        // Objects have data.
        this.x = width / 2;
        this.y = height / 2;
    }

    // Objects have methods.
    show() {
        stroke(0);
        point(this.x, this.y); 
    }


    step() {
        
        let stepSize = 10 * acceptReject();
        let stepX = random(-stepSize, stepSize);
        let stepY = random(-stepSize, stepSize);
        
        // Boundary check: if the walker is about to go out of bounds, reverse direction
        if (this.x + stepX >= width || this.x + stepX <= 0){
          stepX *= -1;
        }
      
        if (this.y + stepY >= height || this.y + stepY <= 0){
          stepY *= -1;
        }
      
        this.x += stepX;
        this.y += stepY;
 

    }
}