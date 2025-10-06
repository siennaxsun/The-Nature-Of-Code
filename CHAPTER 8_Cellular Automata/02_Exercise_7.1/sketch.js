// Expand Example 7.1 to have the following feature: when the CA reaches the bottom of the canvas, the CA starts over with a new, random ruleset.

// define an empty cells array to begin with
let cells = [];
let ruleset;
let generations = []; // store all the states of cells in history, row by row
let cellSize = 10;

function setup() {
  createCanvas(800, 400);
  
  // define the cells with each cell = 0, except the middle one = 1
  for (let i = 0; i < floor(width/cellSize); i++){
    cells[i] = 0;
  }
  cells[floor(cells.length/2)] = 1;    
  
  // store the first cells array to generations history
  generations[0] = cells.slice(); 
  
  // generate a ruleset
  ruleset = rulesetGenerator();
  
  frameRate(5);
}

function draw() {
  background(220);
  
  // get the currentCells from generations array, and copy the current cells to new cells to temporarily store the current state values of each cell to the new cells, which will be overwritten in the for-loop
  let currentCells = generations[generations.length-1];
  let newCells = currentCells.slice(); 
  
  // loop through all the 3 neighborhoold in the current cells, calculate the new state for each cell in the next generation
  for (let i = 1; i < currentCells.length-1; i++){
    // look up the cell's neighborhood
    let left = currentCells[i-1];
    let middle = currentCells[i];
    let right = currentCells[i+1];
    // return the new state value for the next generation
    let newState = rule(left, middle, right);
    newCells[i] = newState; // replace the state value in the newCells at i index
  }
  
  // after finishing the looping for the current cells, make the newCells the current cells
  // cells = newCells;
  // save the current cells to the generations history array
  generations.push(newCells);
  
  
  // visualize the cell state in the current generation
  for (let generation = 0; generation < generations.length; generation++){
    drawCA(generations[generation], generation);
  }
  
  // Stop when canvas is filled, restart from a random ruleset again
  if (generations.length * cellSize >= height) {
    ruleset = rulesetGenerator();
    generations = [];
    generations.push(cells.slice());
    console.log(ruleset);
  }


}


function rule(left, middle, right){
  // concatenate the neighborhood states into a string
  let neighborhood = "" + left + middle + right;
  let index = parseInt(neighborhood, 2);
  return ruleset[7 - index];
  
}

// visualize cell state in black/white squares (state 0 = white, 1 = black)
function drawCA(cells, generationIndex){
    for (let i = 0; i < cells.length; i++){
      if (cells[i] === 0){
        fill (255);
      }else{
        fill(0);
      }
    
      stroke(0);
      rect(i*cellSize, generationIndex*cellSize, cellSize, cellSize);
    }
}

function rulesetGenerator(){
  // generate a random decimal integer between 0-255
  let ruleNumber = floor(random(0, 255)); 
  // convert the decimal to binary number
  let binary = ruleNumber.toString(2).padStart(8, '0');
  let ruleset = binary.split('').map(Number);
  return ruleset;
}
