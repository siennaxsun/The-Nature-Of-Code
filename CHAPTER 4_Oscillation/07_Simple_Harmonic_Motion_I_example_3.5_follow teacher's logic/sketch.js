

function setup() {
    createCanvas(400, 400);


}

function draw() {
    background(220);
    
  
    let amplitude = 150;
    let period = 120;
  
    let xPos = amplitude * sin(TWO_PI * frameCount/120);

    fill(200);
    strokeWeight(2);
  
    translate(width / 2, height / 2);
    line(0, 0, xPos, 0);
    circle(xPos, 0, 50);


}