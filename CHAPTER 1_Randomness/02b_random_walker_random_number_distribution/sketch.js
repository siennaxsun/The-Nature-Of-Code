// An array to keep track of how often random numbers are picked
let randomCounts = [];

// The total number of counts
let total = 20;


function setup() {
  createCanvas(640, 240);
  for (let i = 0; i < total; i++) {
    //  all values in the array start at zero.
    randomCounts[i] = 0;
    // randomCounts = [0, 0, 0, ..., 0]
  }
}

function draw() {
  background(255);
  //generate a random index from the array [0, 19]
  let index = floor(random(randomCounts.length));
  
  //keeps track of how many times a particular index is chosen. if chosen once, then add 1. The more frequently an index is selected, the taller its corresponding bar will be.
  randomCounts[index]++;
  
  stroke(0);
  fill(127);
  
  let rectWidth = width / randomCounts.length;
  
  // Graph the results.
  for (let x = 0; x < randomCounts.length; x++) {
    rect(x * rectWidth, height - randomCounts[x], rectWidth - 1, randomCounts[x]);
  }
}