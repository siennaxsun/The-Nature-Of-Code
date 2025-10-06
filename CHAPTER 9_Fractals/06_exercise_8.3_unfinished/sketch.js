// Try animating the Koch curve. For example, can you draw it from left to right? Can you vary the visual design of the line segments? Can you move the line segments by using techniques from earlier chapters? What if you make each line segment into a spring (Toxiclibs.js) or constraint (Matter.js)?

let segments = [];
let kochcurve;
let generation = 0;

function setup() {
  createCanvas(400, 400);
  
  
  let a = createVector(100, 80);
  let b = createVector(width-100, 80);
  let vectAB = p5.Vector.sub(b, a); // vector from a to b
  let v = vectAB.copy().rotate(PI/2); // rotate vectAB by 60 degrees clockwise
  let c = createVector(a.x, a.y+200) // get c
  let d = createVector(b.x, b.y+200) // get d
  
  
  // initialize the first KochLine object and save it to segments
  kochAB = new KochLine(a, b);
  kochAC = new KochLine(a, c);
  kochBD = new KochLine(b, d);
  kochCD = new KochLine(c, d);
  segments.push(kochAB, kochAC, kochBD, kochCD);
  
  // apply koch rules 5 times
  // for(let i = 0; i < 7; i++){
  //   generate();
  // }
  
  
}

function draw() {
  background(255);
  
  // show the line segments
  for (let seg of segments){
    seg.show();
  }
  
  if(generate()){
    generation ++;
  }else{
    noLoop();
  }



}

function generate(){
    // start this var as false at the beginning of each looping iteration. It will only become true if the length > 3
    let shouldContinue = false; 
    let next = [];
  
    for (let seg of segments){
      let [a, b, c, d, e] = seg.kochPoints(); // array destructuring
      let length = a.dist(b);
      if (length > 1){
        shouldContinue = true;
        next.push(new KochLine(a, b));
        next.push(new KochLine(b, c));
        next.push(new KochLine(c, d));
        next.push(new KochLine(d, e));
      }else{
        next.push(seg); // keep the original segment if it's too small
      }
  }
    
    // replace the current segments array with the next array which contains the newly diffused line objects
    segments = next;
    
    return shouldContinue;
}


class KochLine{
  constructor(a, b){
    this.start = a.copy(); 
    this.end = b.copy();
  }
  
  kochPoints(){
    let a = this.start;
    let e = this.end;
    
    let v = p5.Vector.sub(e, a);
    v.div(3); // make the vector shorten by 1/3
     
    let b = p5.Vector.add(a, v);
    let d = p5.Vector.add(b, v);
    
    v.rotate(PI/3); // rotate the vector by 60 degrees
    let c = p5.Vector.add(b, v);
    
    return [a, b, c, d, e];
    
  }
  
  
  show(){
    stroke(0);
    line(this.start.x, this.start.y, this.end.x, this.end.y)
  }
}