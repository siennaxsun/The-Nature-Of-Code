
// define an array for the 1D cell
let cells = [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0];
let iterationCount = 10;

function setup() {
  createCanvas(800, 400);

}

function draw() {
  background(255);

  let prevCells = cells;
  for (let i = 0; i < iterationCount; i++){
    let newCells = calculateNewState(prevCells);
    drawCells(newCells, iterationCount);
    prevCells = newCells;
  }
               
}


// define rules to calculate the next state for each cell
function calculateNewState(prevCells){
  let newCells = [];
  newCells.push(prevCells[0]);
  for (let i = 1; i < prevCells.length-1; i++){
    let newState = 0;
    for (let j = 0; j < 8; j++){
      let rule = prevCells[i].toString(2).padStart(3);
      rule = rule.split('').map(Number);  // convert to [0, 1, 0] format
      if (rule[0]===prevCells[i-1] && rule[1] === prevCells[i] && rule[2] === prevCells[i+1]){
        newState=rule[1];
      }
    }
    console.log(newState);
    
    newCells.push(newState);
 
  }
  newCells.push(prevCells[-1]);
  return newCells;
}

// turn the binary number in each cells into black/white squares
function drawCells(cells, generations){
  for (let generation = 0; generation < generations; generation++){
    for (let i = 0; i < cells.length; i++){
      if (cells[i] ===0){
        fill(255)
      }else{
        fill(0)
      }
      stroke(0);
      rect(i*40, generation*40, 40, 40);
    }
  }
  
}

