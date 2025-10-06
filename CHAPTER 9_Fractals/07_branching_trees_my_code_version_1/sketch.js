let branches = [];
let stem; 
let generation = 0;

function setup() {
  createCanvas(400, 400);
  background(255);
  let startingPos = createVector(width/2, height-50);
  let startingLen = 100;
  let direction = createVector(0, -1); // in p5.js, the y-positive axis is (0, -1)
  stem = new BranchingTree(startingPos, startingLen, direction);
  branches.push(stem);
}

function draw() {
  
  for (let i = 0; i < 100; i++){
    grow(branches[i]);
    generation++;
    console.log(generation);
  }
  
  for (let branch of branches){
    branch.show();
  }
  
  noLoop();
}

function grow(branch){
  let rotatingAngle = random(PI/6, PI/3);
  let newStart = branch.end.copy();
  let newLen = branch.length * 0.6;
  let branchDir1 = branch.growDir.copy().rotate(rotatingAngle);
  let branchDir2 = branch.growDir.copy().rotate(-rotatingAngle);
  // let newEnd1 = p5.Vector.add(newStart, branchDir1.setMag(newLen));
  // let newEnd2 = p5.Vector.add(newStart, branchDir2.setMag(newLen));
  let newBranch1 = new BranchingTree(newStart, newLen, branchDir1);
  let newBranch2 = new BranchingTree(newStart, newLen, branchDir2);
  branches.push(newBranch1, newBranch2);
}


class BranchingTree{
  constructor(startingPos, startingLen, direction){
    this.start = startingPos;
    this.length = startingLen;
    this.growDir = direction;
    this.end = p5.Vector.add(this.start, this.growDir.copy().setMag(this.length));
    
  }
  
  getBranches(){
    let angle = PI/4;
  }
  
  show(){
    stroke(0);
    // let weight = 10/generation;
    strokeWeight(1);
    line(this.start.x, this.start.y, this.end.x, this.end.y)
    
  }
}