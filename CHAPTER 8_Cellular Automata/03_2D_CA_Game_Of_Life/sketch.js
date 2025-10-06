



let generation = 0; // counter of the generations
let cellSize = 10;
let rows;
let cols
let board;

function setup() {
  createCanvas(800, 400);
  background(220);
  
  // create a 2D array data structure
  cols = floor(width/cellSize);
  rows = floor (height/cellSize);
  board = new Array(cols);
  for (let col = 0; col < cols; col++){
    board[col] = new Array(rows);
  }
  
  // define cell's state in random 0 or 1 in each cell
  for (let col = 0; col < cols; col ++){
    for (let row = 0; row < rows; row++){
      board[col][row] = floor(random(2));
    }
  }
  
  drawCA(board);
  
  // frameRate(5);
}

function draw() {
  
  // copy the existing board to a new board
  // let newBoard = board.slice();
  // note--- .slice() creates a shallow copy, so changing newBoard[col][row] will also change board[col][row]. You will need a deep copy of board
  let newBoard = create2DArr(cols, board);
  // for (let col = 0; col < cols; col++) {
  //   newBoard[col] = board[col].slice();
  // }  
  
  // get the current state of the mid cell of its 9-neighborhood through the for-loop (need to exclude the edge cells)
  for (let col = 1; col < cols-1; col++){
    for (let row = 1; row < rows-1; row++){
      let midCellState = board[col][row];
      
      let oneCount = countLiveNeighbors(col, row);
      
      if (midCellState === 1){
        if (oneCount >= 4 || oneCount <= 1){
          let midCellStateNew = 0;
          newBoard[col][row] = midCellStateNew;
        }
      } else{
        if (oneCount === 3){
          let midCellStateNew = 1;
          newBoard[col][row] = midCellStateNew;
        }
      }
      
    }
  }
  
  // make this newly created board to be the current board
  board = newBoard;
  
  // visualize the current generation of the board
  drawCA(board);
  
}

function create2DArr(cols, board){
  let newBoard = new Array(cols);
  for (let col = 0; col < cols; col++) {
    newBoard[col] = board[col].slice();
  }  
  return newBoard;
}

function countLiveNeighbors(col, row){
  let neighborTopLeft = board[col-1][row-1];
  let neighborTopMid = board[col][row-1];
  let neighborTopRight = board[col+1][row-1];
  let neighborLeft = board[col-1][row];
  let neighborRight = board[col+1][row];
  let neighborBottomLeft = board[col-1][row+1];
  let neighborBottomMid = board[col][row+1];
  let neighborBottomRight = board[col+1][row+1];
  
  let neighborhood = [neighborTopLeft, neighborTopMid, neighborTopRight, neighborLeft, neighborRight, neighborBottomLeft, neighborBottomMid, neighborBottomRight] ;
  let zeroCount = neighborhood.filter(x => x === 0).length;
  let oneCount = neighborhood.filter(x => x === 1).length;
  
  return oneCount;
}



// visualize cell state in black/white squares (state 0 = white, 1 = black)
function drawCA(board){
    for (let col = 0; col < cols; col++){
      for (let row = 0; row < rows; row++){
        let c = 255 - board[col][row] * 255;
        fill (c);
        stroke(0);
        rect(col*cellSize, row*cellSize, cellSize, cellSize);
    }
  }
} 

