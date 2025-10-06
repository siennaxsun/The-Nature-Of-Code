// one circle only:

// let ball;
// let angleX;

// function setup() {
//     createCanvas(400, 400);
    
//     for (let i = 0; i < width; i+=10){
//       angleX = map(i, 0, width, -TWO_PI, TWO_PI);
//       ball = new Circle(angleX);
//   }
  
// }

// function draw() {
//   background(220);
  
//   ball.update();
//   ball.show();

// }

// class Circle{
//   constructor(angleX){
//     this.diameter = 50;    
//     this.angleX = angleX;
//     this.angularVelocityX = 0.1;     
//     this.amplitudeX = height/2;
//   }
  
//   update(){
//     this.angleX += this.angularVelocityX
//     console.log(this.angleX)
//   }
  
//   show(){
//     fill(200);
//     strokeWeight(2);
    
//     let x = this.angleX;
//     let y = this.amplitudeX * sin(x);
//     console.log(this.angleX, x, y);
//     push()
//     translate(width/2, height/2);
//     circle(x, y, this.diameter);
//     pop();
//   }
  
  
// }




// array of circles:

// one circle only:

// let ball;
// let angleX;

// function setup() {
//     createCanvas(400, 400);

//     for (let i = 0; i < width; i+=10){
//       angleX = map(i, 0, width, -TWO_PI, TWO_PI);
//       ball = new Circle(angleX);
//   }

// }

// function draw() {
//   background(220);

//   ball.update();
//   ball.show();

// }

// class Circle{
//   constructor(angleX){
//     this.diameter = 50;    
//     this.angleX = angleX;
//     this.angularVelocityX = 0.1;     
//     this.amplitudeX = height/2;
//   }

//   update(){
//     this.angleX += this.angularVelocityX
//     console.log(this.angleX)
//   }

//   show(){
//     fill(200);
//     strokeWeight(2);

//     let x = this.angleX;
//     let y = this.amplitudeX * sin(x);
//     console.log(this.angleX, x, y);
//     push()
//     translate(width/2, height/2);
//     circle(x, y, this.diameter);
//     pop();
//   }


// }




// array of circles:

let circles = [];
let angles = []
let num;
let waveLength;
let spacing;

function setup() {
    createCanvas(400, 400);

    waveLength = TWO_PI;
    spacing = 5;
    num = floor(width / spacing);
    for (let i = 0; i < num; i++) {
        let angleX = (waveLength / num) * i
        circles[i] = new Circle(angleX);
    }


}

function draw() {
    background(220);

    for (let i = 0; i < num; i++) {
        circles[i].update();
        circles[i].show();
    }

}

class Circle {
    constructor(angleX) {
        this.diameter = 50;
        this.angleX = angleX;
        this.angularVelocityX = 0.06;
        this.amplitudeX = height / 2;
    }

    update() {
        this.angleX += this.angularVelocityX
        // console.log(this.angleX)
    }

    show() {
        fill(200);
        strokeWeight(2);


        // let angleXLimit = width/2 * (waveLength / width);
        // let x;
        // if (this.angleX < angleXLimit){
        //   x = map(this.angleX, 0, waveLength, width * (-1/2), width/2);
        // } else{
        //   this.angleX = 0;
        //   x = map(this.angleX, 0, waveLength, width * (-1/2), width/2)
        // }

        // Keep this.angleX within 0 to TWO_PI range
        this.angleX = this.angleX % waveLength;
        let x = map(this.angleX, 0, waveLength, width * (-1 / 2), width / 2)
        let y = this.amplitudeX * sin(x);
        console.log(this.angleX, x, y);

        push()
        translate(width / 2, height / 2);
        circle(x, y, this.diameter);
        pop();
    }


} 