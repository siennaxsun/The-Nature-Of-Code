// Try using the Perlin noise function instead of sine or cosine to set the y values in Example 3.9


let spacing = 20;
let deltaAngle = 0.5;
let startAngle = 0;
let amplitude = 100;

function setup() {
    createCanvas(400, 400);


}

function draw() {
  
  background(220);
  
  let angle = startAngle;
  
  for (let x = 0; x < width; x += spacing){
    y = map(noise(angle), -1, 1, 0, height);
    angle += deltaAngle;
    circle(x, y, 50);
    }
  
  startAngle += 0.5;

}