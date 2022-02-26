let bodies = [];

function setup() {
  createCanvas(900, 900);
  
  for (let i = 0; i < 150; i++) {
    let p = p5.Vector.random2D();
    let v = p.copy();
    p.setMag(random(100, 400));
    v.setMag(random(1, 20));
    v.rotate(PI/2);
    let m = random(1, 30);
    bodies.push(new Body(p, v, m));
  }
  
  background(0);
}

function draw() {
  background(0);
  translate(width/2, height/2);
  
  for (let b of bodies) {
    for (let b2 of bodies) {
      if (b == b2) { continue; }
      b.attract(b2);
    }
  }
  
  for (let b of bodies) {
    b.update();
    b.show();
  }
}
