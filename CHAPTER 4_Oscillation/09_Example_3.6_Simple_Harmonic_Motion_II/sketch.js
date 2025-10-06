/*using angle that increments with the angular veolocity*/

let angle = 0;
let angularVelocity = 0.05;
let amplitude = 150;

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(220);
    
    angle += angularVelocity;
    let xPos = amplitude * sin(angle);

    fill(200);
    strokeWeight(2);
  
    translate(width / 2, height/2);
    line(0, 0, xPos, 0);
    circle(xPos, 0, 50);


}