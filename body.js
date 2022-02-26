class Body {
  constructor(pos, vel, m) {
    this.pos = pos;
    this.vel = vel;
    this.acc = createVector(0, 0);
    this.mass = m;
    this.r = sqrt(this.mass) * 2;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  attract(body) {
    let f = p5.Vector.sub(this.pos, body.pos);
    let dd = constrain(f.magSq(), 100, 1000);
    let G = 1;
    let strength = (G * (this.mass * body.mass)) / dd;
    f.setMag(strength);
    body.applyForce(f);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }
  
  show() {
    stroke(255);
    strokeWeight(2);
    fill(255, 100);
    ellipse(this.pos.x, this.pos.y, this.r*2);
  }
}
