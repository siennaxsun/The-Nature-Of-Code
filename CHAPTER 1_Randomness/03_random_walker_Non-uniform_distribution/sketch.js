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
        stroke(0);
        point(this.x, this.y); // never forget the this. when referencing the properties (variables) of that object
    }


    step() {
        // Generate a random walker in 4 directions
        //generate a random number among 0, 1, 2, or 3. The random choice determines the step.        
        
        let choiceUp = random(0.2);
        let choiceDown = random (0.2, 0.4);
        let choiceLeft = random(0.4, 0.6);
        let choiceRight = random(0.6, 1.0);
        let choices = [choiceUp, choiceDown, choiceLeft, choiceRight];
        let choice = random(choices);
      
        if (choice<0.2) {
            this.x++;
        } else if (choice < 0.4 && choice > 0.2) {
            this.x--;
        } else if (choice < 0.6 && choice > 0.4) {
            this.y++;
        } else {
            this.y--;
        }


        // generate a random walker in 9 directions, including 原地不动, so x and y each has 3 directions (-1, 0, 1)
        // let stepX = random(-1, 1)
        // let stepY = random(-1, 1);
        // this.x += stepX;
        // this.y += stepY;

    }
}