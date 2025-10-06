
let x;
let y;

function setup() {
    createCanvas(400, 400);
    
    x = width/2;
    y = height/2
    fill(200);
    strokeWeight(2);
    circle(x, y, 50);


}

function draw() {
    background(220);
    
    let oscillatingDist = 150;
    x -= 0.05;
    if (x <= oscillatingDist) {
        x += 1;
    } else if (x >= width - oscillatingDist) {
        x -= 1;
    }
    xNew = sin(x) * oscillatingDist;

    translate(width / 2, height / 2);
    line(0, 0, xNew, 0);
    circle(xNew, 0, 50);


}