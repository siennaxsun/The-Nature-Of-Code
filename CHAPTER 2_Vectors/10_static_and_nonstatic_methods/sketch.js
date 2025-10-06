/*
Translate the following pseudocode to code, using static or nonstatic functions where appropriate:

- The vector **`v`** equals (1, 5).
- The vector **`u`** equals **`v`** multiplied by 2.
- The vector **`w`** equals **`v`** minus **`u`**.
- Divide the vector **`w`** by 3.
*/

function setup() {
  createCanvas(400, 400);
  background(220);
  
  
}

function draw() {
  
  let v = createVector (10, 50);
  let u = p5.Vector.mult(v, 2);
  let w = p5.Vector.sub(v, u);
  w.div(3);
  //console.log('the vector v is ${v}, the vector u is ${u}, the vector w is ${w}')
  
  // vector v
  strokeWeight(10);
  stroke (200);
  line(0, 0, v.x, v.y);
  
  // vector u  
  strokeWeight(4);
  stroke (100);
  // translate(v.x, v.y);
  line(0, 0, u.x, u.y);
  
  // vector w
  strokeWeight(10);
  stroke (0);
  translate(v.x, v.y);
  line(0, 0, w.x, w.y);
}

