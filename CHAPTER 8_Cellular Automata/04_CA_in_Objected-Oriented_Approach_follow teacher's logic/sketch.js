

let board;
let cols, rows;
let cellSize = 10;


function setup() {
  createCanvas(800, 400);
  
  cols = floor(width/cellSize);
  rows = floor(height/cellSize);
  
  // initialize the grid board
  board = new CellSystem(cols, rows, cellSize);
  
}

function draw() {
  background(220);
  
  board.updateCellStates();
  board.display();

}





//----------------------------------------------------------------
class CellSystem{
  constructor(cols, rows, cellSize){
    this.cols = cols;
    this.rows = rows;
    this.cellSize = cellSize;
    
    // fill board with a 2D array of cells with random states. Since each cell is a Cell object, you can access Cell's methods when looping the cells of the board
    this.board = this.addCells(); 
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        this.board[col][row] = new Cell(col * cellSize, row * cellSize, cellSize, floor(random(2)));
  }
}
  }
  
  addCells(){
    let arr = new Array(this.cols);
    for (let col = 0; col < this.cols; col++){
      arr[col] = new Array(this.rows);
      for (let row = 0; row < this.rows; row++){
        // arr[col][row] = new Cell (col*this.cellSize, row*this.cellSize, this.cellSize, floor(random(2)));
        arr[col][row] = 0; // placeholder; you’ll replace later with Cell()
      }
    }
    return arr;
  }
  
  updateCellStates(){
    // loop through the board cells, and update each next and previous state
    for (let col = 1; col < this.cols-1; col++){
      for (let row = 1; row < this.rows-1; row++){
        // calculate the number of living neighbors
        let neighborSum = 0;
        for (let i = -1; i < 2; i++){
          for (let j = -1; j < 2; j++){
            neighborSum += this.board[col+i][row+j].previous;
          }
        }
        neighborSum -= this.board[col][row].previous;
      
        // set the cell's new state based on the number of living neighbors
        if (this.board[col][row].state == 1){
          if (neighborSum >= 4 || neighborSum <=1){
            this.board[col][row].state = 0;
          }
        } else {
          if (neighborSum == 3){
            this.board[col][row].state = 1;
          }
        }

      }
    }
  }
  
  display(){
    // visualize the cells based on its state changes
    for (let col = 0; col < this.cols; col ++){
      for (let row = 0; row < this.rows; row++){
        this.board[col][row].show();
        // update the previous state for the next iteration
        this.board[col][row].previous = this.board[col][row].state;
      }
    }
  }
  
}

//----------------------------------------------------------------
class Cell{
  constructor(x, y, cellSize, state){
    this.cellSize = cellSize;
    // this.cols = floor(width/this.cellSize);
    // this.rows = floor (height/this.cellSize);
    this.x = x; // x position
    this.y = y; // y position
    
    // initialize the cell's state and track its previous state
    this.state = state;
    this.previous = this.state
    
  }
  

  
  show(){

    stroke(0);
    if (this.previous === 0 && this.state === 1){
      fill (0, 0, 255);
    }else if (this.previous === 1 && this.state === 0){
      fill (255, 0, 0);
    }else if (this.state === 1){
      fill (0);
    }else{
      fill (255);
    }
    rect(this.x, this.y, this.cellSize, this.cellSize);
    
  }
}

