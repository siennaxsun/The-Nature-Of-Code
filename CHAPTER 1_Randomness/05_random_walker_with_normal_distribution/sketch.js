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
        let alpha = randomGaussian(20, 100);
        fill(0, alpha);
        noStroke();
        
        let radius = constrain(randomGaussian(5.5, 10), 1, 10);
        circle (this.x, this.y, radius);
        // point(this.x, this.y); 
    }


    step() {
        // generate a random walker in 9 directions, including 原地不动
        let mean = 0;
        let sd = 3;
        let stepX = randomGaussian(mean, sd);
        let stepY = randomGaussian(mean, sd);
        
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