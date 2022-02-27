class Body {
  constructor(pos, vel, m, i) {
    this.pos = pos;
    this.vel = vel;
    this.acc = createVector(0, 0);
    this.mass = m;
    this.r = sqrt(this.mass) * 2;
    this.index = i;
    this.isColliding = false;

  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  attract(body) {
    //only perform collision on 1 of the balls
    if (
      this.index > body.index && 
      this.pos.dist(body.pos) < this.r + body.r
    ) {
      //console.log("Collision detected: ")
      this.collision(body);
      return;
    }

    let f = p5.Vector.sub(this.pos, body.pos);
    let dd = constrain(f.magSq(), 100, 1000);
    let G = 1;
    let strength = (G * (this.mass * body.mass)) / dd;
    f.setMag(strength);
    body.applyForce(f);
  }

  //elastic
  collision(body) {
    this.isColliding = true;
    body.isColliding = true;
    let totalMass = this.mass + body.mass;
    let diffPos = p5.Vector.sub(body.pos, this.pos);
    let diffVel = p5.Vector.sub(body.vel, this.vel);
    
    let scalar = -2 * this.mass * body.mass / totalMass *
        diffPos.dot(diffVel) / 
        p5.Vector.normalize(diffPos)**2;
    
    let v1New = p5.Vector.mult(diffPos, -scalar / this.mass).add(this.vel);
    body.vel = p5.Vector.mult(diffPos, -scalar / body.mass).add(body.vel);
    console.log("Collision: v1New:"+v1New+", this.vel:" + this.vel);
    this.vel = v1New;
  }

  update() {
    if (!this.isColliding) { this.vel.add(this.acc); }
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    this.isColliding = false;
  }
  
  show() {
    stroke('salmon');
    strokeWeight(2);
    fill('pink');
    ellipse(this.pos.x, this.pos.y, this.r*2);
  }
}
