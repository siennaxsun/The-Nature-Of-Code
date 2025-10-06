let kochCurve;

function setup() {
  createCanvas(800, 400);
  
  
  kochCurve = new KochLine(100, height/2, 600, 0);
  
}

function draw() {
  background(255);8
  
  kochCurve.recursion();
  kochCurve.display();
  noLoop();
  
}

class KochLine{
  constructor(x, y, length, angle){
    this.length = length;
    this.startX = x;
    this.startY = y; 
    this.angle = angle; // this is the angle to the x-axis
    this.diffusedLines = []; // stores the diffused lines as objects of KochLine
    // calculate the end point position based on length, angle and starting point
    this.endX = this.startX + cos(this.angle) * this.length;
    this.endY = this.startY + sin(this.angle) * this.length;
    this.endPos = createVector(this.endX, this.endY);
    
  }
  
  recursion(){
    let newLen = this.length/3;
    
    // to create 4 diffused lines as objects of KochLine class, you need to know the starting positions of the 4 line segments, which is posA for lineAB, posB for lineBC, posC for lineCD, and posD for lineDE
    
    // two divided lines (left and right) parallel to the parent line
    let posA = createVector(this.startX, this.startY); // startingPos
    let posE = createVector(this.endX, this.endY); // endingPos
    let dirAB = createVector(cos(this.angle), sin(this.angle)).mult(newLen);
    // let posB = posA.add(vectAB); // add vectAB to point vector posA, leaving vectAB unchanged, but changed posA
    // note: if you do let pointB = vAB.add(createVector(this.startX, this.startY)); this modifies vAB directly 
    // to avoid change both posA and vectAB: // B = A + 1/3 of vectAB
    let posB = p5.Vector.add(posA, dirAB); // from posA to add vectAB
    // or: let posB = posA.copy().add(dirAB);

    // pos D = postA + 2/3 of vectAB
    let posD = posA.copy().add(dirAB.copy().mult(2));
    
    // to get posC, need to get vectBD and then rotate it
    let dirBD = p5.Vector.sub(posD, posB); // vector from B to D
    // clockwise rotate (negative angle) or counterclockwise (positive angle).
    // In most 2D computer graphics coordinate systems (including p5.js), positive rotation angles rotate counterclockwise.
    // If your base segment is pointing to the right (0 radians), then:
        // Rotating by PI/3 (≈ 60° CCW) moves the vector upward-left,
        // Rotating by -PI/3 (≈ 60° CW) moves the vector downward-left.
    dirBD.rotate(-PI/3);  // wrong, because you mutated dirBD
    let posC = posB.copy().add(dirBD);
    
    
    // with all A, B, C, D points known, you can create the objects of the 4 diffused line objects
    let lineAB = new KochLine(posA.x, posA.y, newLen, this.angle);
    let lineDE = new KochLine(posD.x, posD.y, newLen, this.angle);
    let lineBC = new KochLine(posB.x, posB.y, newLen, this.angle-PI/3);
    let lineCD = new KochLine(posC.x, posC.y, newLen, this.angle+PI/3);
    

    this.diffusedLines.push(lineAB, lineBC, lineCD, lineDE);
    

    for (let cur of this.diffusedLines){
      if (cur.length > 5){
        cur.recursion();
        // cur.display();
      }
      
    }

  }
  
  display(){
    // draw the line
    stroke(0);
    
    line(this.startX, this.startY, this.endX, this.endY); 
    
    for (let cur of this.diffusedLines){
      cur.display();
    }
    
  }
  
  removelineBD(){
    
  }
}