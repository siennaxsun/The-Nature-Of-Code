let branches = [];
let stem; 
let generation = 1;

function setup() {
  createCanvas(400, 400);
  background(255);
  
  let startingPos = createVector(width/2, height-50);
  let startingLen = 100;
  let direction = createVector(0, -1); // in p5.js, the y-positive axis is (0, -1)
  stem = new BranchingTree(startingPos, startingLen, direction);
  stem.show(generation);
  branches.push(stem);
}

function draw() {
  
  for (let branch of branches){
    if(branch.hasGrown == false){
      generation++;
      let newBranches = branch.grow();
      branch.show(generation);
      branches.push(newBranches);
      branches = branches.flat(Infinity);
    }
  }
  
  noLoop();
  
  

  
}

function grow(branch){
  let newBranches = []
  let shouldGrow = false;
  let rotatingAngle = PI/6;
  let newStart = branch.end.copy();
  let newLen = branch.length * 0.6;
  if (newLen>0.5){  
    let branchDir1 = branch.growDir.copy().rotate(rotatingAngle);
    let branchDir2 = branch.growDir.copy().rotate(-rotatingAngle);
    let newBranch1 = new BranchingTree(newStart, newLen, branchDir1);
    let newBranch2 = new BranchingTree(newStart, newLen, branchDir2);
    shouldGrow = true;
    newBranches.push(newBranch1, newBranch2);
  }
    
  return newBranches;
}


class BranchingTree{
  constructor(startingPos, startingLen, direction){
    this.start = startingPos;
    this.length = startingLen;
    this.growDir = direction;
    this.end = p5.Vector.add(this.start, this.growDir.copy().setMag(this.length));
    this.hasGrown = false;
    
  }
  
  grow(){
    let newBranches = []
    let rotatingAngle = random(0, PI/4);
    let newStart = this.end.copy();
    let newLen = this.length * 0.6;
    if (newLen>0.5){
      this.hasGrown = true;
      let branchDir1 = this.growDir.copy().rotate(rotatingAngle);
      let branchDir2 = this.growDir.copy().rotate(-rotatingAngle);
      let newBranch1 = new BranchingTree(newStart, newLen, branchDir1);
      let newBranch2 = new BranchingTree(newStart, newLen, branchDir2);
      newBranches.push(newBranch1, newBranch2);
      // branches.push(newBranch1, newBranch2);
    }

    return newBranches;
  }
  
  show(generation){
    let transparency = constrain(generation/255, 0, 255);
    let weight = constrain(4/generation, 0, 4);
    stroke(transparency);
    strokeWeight(weight);
    line(this.start.x, this.start.y, this.end.x, this.end.y)
    
  }
}