var inc = 0.1;
var scl = 20;
var cols, rows;

var zoff = 0;

var fr;

var particles = [];

var flowField;

function setup() {
  createCanvas(1000, 400);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP("");
  button = createButton("click me");
  button.position(0, 0);
  button.mousePressed(saveImage);

  flowField = new Array(cols * rows);

  for (var i = 0; i < 2000; i++) {
    particles[i] = new Particle();
  }
  background(255);
}

function draw() {
  // background(255);

  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    var weight = (y - rows / 2) / (rows / 2);
    var pusher = sin(weight);
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var r = noise(xoff, yoff, zoff) * TWO_PI;
      var v = p5.Vector.fromAngle(r);
      // console.log(v.y);
      v.y = -v.y - pusher / (1 - abs(pusher));

      // How strong does it stick to the vector (choppy ness)
      v.setMag(0.2);
      flowField[index] = v;
      xoff += inc;
      stroke(0, 50);
      strokeWeight(1);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // line(0, 0, scl, 0);
      // pop();
    }
    yoff += inc;

    // Impacts rate of curve change (sharpmneess of curves)
    // Speed that you are moving through time
    zoff += 0.0004;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowField);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  fr.html(floor(frameRate()));
}

function saveImage() {
  saveCanvas("myCanvas", "png");
}
