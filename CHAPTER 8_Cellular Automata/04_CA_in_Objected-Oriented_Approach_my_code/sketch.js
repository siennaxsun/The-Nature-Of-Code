

let board;

function setup() {
  createCanvas(800, 400);
  
  
  board = new Cell();
  
  // frameRate(5);
}

function draw() {
  background(220);
  
  // update the current board's cell states
  board.updateCellState(); 
  
  // visualize the current generation of the board
  board.show();
  
  
  
}


class Cell{
  constructor(){
    this.cellSize = 10;
    this.cols = floor(width/this.cellSize);
    this.rows = floor (height/this.cellSize);
    // define this.board as a 2D array data structure
    this.board = new Array(this.cols) 
    for (let col = 0; col < this.cols; col++){
      this.board[col] = new Array(this.rows);
    }
    // define cell's state in random 0 or 1 in each cell
    for (let col = 0; col < this.cols; col ++){
      for (let row = 0; row < this.rows; row++){
        this.board[col][row] = floor(random(2));
      }
    }
    
  }
  
  countLiveNeighbors(col, row){
    let neighborTopLeft = this.board[col-1][row-1];
    let neighborTopMid = this.board[col][row-1];
    let neighborTopRight = this.board[col+1][row-1];
    let neighborLeft = this.board[col-1][row];
    let neighborRight = this.board[col+1][row];
    let neighborBottomLeft = this.board[col-1][row+1];
    let neighborBottomMid = this.board[col][row+1];
    let neighborBottomRight = this.board[col+1][row+1];
  
    let neighborhood = [neighborTopLeft, neighborTopMid, neighborTopRight, neighborLeft, neighborRight, neighborBottomLeft, neighborBottomMid, neighborBottomRight] ;
    let zeroCount = neighborhood.filter(x => x === 0).length;
    let oneCount = neighborhood.filter(x => x === 1).length;
  
    return oneCount;
  }
  
  
  updateCellState(){
    // get the current state of the mid cell of its 9-neighborhood through the for-loop (need to exclude the edge cells), update this cell's state for the next generation based on Conway's rule
    // let newBoard = this.create2DNewArr(this.);
    let newBoard = new Array(this.cols);
    for (let col = 0; col < this.cols; col++) {
      newBoard[col] = this.board[col].slice(); // deep copy row
    }
    
    for (let col = 1; col < this.cols-1; col++){
      for (let row = 1; row < this.rows-1; row++){
        let midCellState = this.board[col][row];     
        let oneCount = this.countLiveNeighbors(col, row);
      
        if (midCellState === 1){
          if (oneCount >= 4 || oneCount <= 1){
            newBoard[col][row] = 0;
          }
        } else{
          if (oneCount === 3){
            newBoard[col][row] = 1;
          }
        }
      
      }
    } 
    
    // return newBoard;
    this.board = newBoard; // directly update this.board here
  }
  
  
  show(){
    for (let col = 0; col < this.cols; col++){
      for (let row = 0; row < this.rows; row++){
        let c = 255 - this.board[col][row] * 255;
        fill (c);
        stroke(0);
        rect(col*this.cellSize, row*this.cellSize, this.cellSize, this.cellSize);
      }
    }
  }
}

