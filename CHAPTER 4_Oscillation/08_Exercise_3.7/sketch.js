/*Using the sine function, create a simulation of a weight (sometimes referred to as a bob) that hangs from a spring from the top of the window. Use the map() function to calculate the vertical position of the bob. In “Spring Forces”, I’ll demonstrate how to create this same simulation by modeling the forces of a spring according to Hooke’s law.*/

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(220);
    
    let amplitude = 150;
    let period = 120;
    let startingY = height/2;
    let yPos = amplitude * sin(TWO_PI * frameCount/120);

    fill(200);
    strokeWeight(2);
  
    // translate(width / 2, 0);
    line(width/2, 0, width/2, yPos+startingY);
    circle(width/2, yPos+startingY, 50);


}