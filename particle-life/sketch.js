let cells = [];
let arr = [];
let arrp = [];
let atoms = 700;
let colors = 6;
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i=0; i<atoms; i++) {
       cells.push([random(0, width), random(0, height), round(random(0, colors-1)), 0, 0])
  }
  radius = createSlider(0, 300, 1);
  radius.position(10, 10);
  radius.style('width', '80px');
  
  
  move = createSlider(0, 10, 0.1);
  move.position(10, 30);
  move.style('width', '80px');
  
  cradius = createSlider(1, 10, 1);
  cradius.position(10, 50);
  cradius.style('width', '80px');
  
  friction = createSlider(0, 100, 1);
  friction.position(10, 70);
  friction.style('width', '80px');
  
  types = createSlider(0, 100, 1);
  types.position(10, 90);
  types.style('width', '80px');
  
  satoms = createSlider(0, 5000, 1);
  satoms.position(10, 110);
  satoms.style('width', '80px');
  
  for (let j=0; j<colors; j++) {
    arrp.push(random(-1, 1));
  }
  for (let i=0; i<colors; i++) {
    arr.push(arrp);
    arrp = [];
    for (let j=0; j<colors; j++) {
      arrp.push(random(-1, 1));
    }
  }
  button = createButton('Randomize Attraction Values');
  button.position(10, 140);
  button.mousePressed(randomarr);
  satoms.changed(start);
  types.changed(start);
}

function randomarr() {
  arr = [];
  arrp = [];
  for (let j=0; j<colors; j++) {
    arrp.push(random(-1, 1));
  }
  for (let i=0; i<colors; i++) {
    arr.push(arrp);
    arrp = [];
    for (let j=0; j<colors; j++) {
      arrp.push(random(-1, 1));
    }
  }
}

function start() {
  atoms = satoms.value()
  colors = types.value()
  cells = [];
  for (let i=0; i<atoms; i++) {
       cells.push([random(0, width), random(0, height), round(random(0, colors-1)), 0, 0])
  }
}
function draw() {
  background(0);
  fill(255);
  text("Attraction Radius: " + radius.value(), 100, 25);
  text("Random Movement Amount: " + move.value(), 100, 45);
  text("Cell Radius: " + cradius.value(), 100, 65);
  text("Friction: " + friction.value()/100, 100, 85);
  text("Particles: " + satoms.value(), 100, 125);
  text("Colors: " + types.value(), 100, 105);
  for (let i=0; i<atoms; i++) {
    cells[i][3] += random(-move.value(), move.value());
    cells[i][4] += random(-move.value(), move.value());
    for (let j=0; j<atoms; j++) {
      fx = 0;
      fy = 0;
      dx = cells[i][0] - cells[j][0]
      dy = cells[i][1] - cells[j][1]
      d = (dx**2 + dy**2)**0.5
      if (d > 0 && d < radius.value()) {
        F = arr[cells[i][2]][cells[j][2]]/d
        fx += F*dx
        fy += F*dy
      }
      cells[i][3] = (cells[i][3] + fx)*0.5
      cells[i][4] = (cells[i][4] + fy)*0.5
      if (cells[i][0] <= 0 || cells[i][0] >= width) {
        cells[i][3] *= -2
      }
      if (cells[i][1] <= 0 || cells[i][1] >= height) {
        cells[i][4] *= -2
      }
      if (random(0, 1) < 0.0001) {
        cells[i][3] += random(-20, 20);
        cells[i][4] += random(-20, 20);
      }
      cells[i][3] *= 1-(friction.value()/100);
      cells[i][4] *= 1-(friction.value()/100);
      cells[i][0] += cells[i][3]
      cells[i][1] += cells[i][4]
    }
    colorMode(HSB, 255);
    fill(map(cells[i][2], 0, colors, 0, 255), 175, 255);
    circle(cells[i][0], cells[i][1], cradius.value());
  }
}
