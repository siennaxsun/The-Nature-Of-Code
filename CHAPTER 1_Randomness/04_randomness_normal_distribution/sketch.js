let standardDevivation;
let slider;

function setup() {
  createCanvas(400, 400);
  background(220);
  
  slider = createSlider(0, 100, 60); // min, max, default value
  slider.position(10, 10);
  standardDevivation = slider.value(); // Initialize standardDevivation
}

function draw() {
  
  let radius = 16;
  let x = randomGaussian(width/2, standardDevivation); //A normal distribution with mean 320 and standard deviation 60 
  let y = randomGaussian(height/2, standardDevivation); 
  let r = randomGaussian(255/2, standardDevivation);
  let g = randomGaussian(255/2, standardDevivation);
  let b = randomGaussian(255/2, standardDevivation);
  
  fill(r, g, b, 10);
  noStroke();
  
  circle(x, y, radius);
  
  standardDevivation = slider.value(); // Update standardDevivation in each frame
  
  text("SD: " + standardDevivation, 10, 150); // Optionally, display the slider's value
  
}