let mover;

function setup(){
  createCanvas(800, 400);
  mover = new Mover();
  
}

function draw(){
  background(200);
  
  mover.show();
  mover.update();
  mover.checkEdges();
}


class Mover{
	constructor(){
		this.position = createVector(random(width), random(height));
		this.velocity = createVector(0, 0);
        this.acceleration = createVector(-0.001, 0.01);
        this.topspeed = 10; // limit the magnitude of velocity.
	}
	
	update(){
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.topspeed); // constrains the magnitude of a vector.
        this.position.add(this.velocity);// since you add two vectors, use the add()
	}
	
	show(){
		stroke(0);
		fill (120);
		circle(this.position.x, this.position.y, 25);
	}
	
	checkEdges(){
    //When it reaches one edge, set the position to the other edge.
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }
  
 


}