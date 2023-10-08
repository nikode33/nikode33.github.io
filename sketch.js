const cells = [];
const arr = [];
let arrp = [];
let atoms = 700;
let colors = 9;
function setup() {
  createCanvas(800, 800);
  for (let i=0; i<atoms; i++) {
       cells.push([random(0, width), random(0, height), round(random(0, colors-1)), 0, 0])
  }
  radius = createSlider(0, 300, 1);
  radius.position(10, 10);
  radius.style('width', '80px');
  
  
  move = createSlider(0, 10, 0.1);
  move.position(10, 30);
  move.style('width', '80px');
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

function draw() {
  background(220);
  fill(0);
  text("Attraction Radius: " + radius.value(), 100, 25);
  text("Random Movement Amount: " + move.value(), 100, 45);
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
        cells[i][3] *= -1
      }
      if (cells[i][1] <= 0 || cells[i][1] >= height) {
        cells[i][4] *= -1
      }
      
      cells[i][0] += cells[i][3]
      cells[i][1] += cells[i][4]
    }
    switch (cells[i][2]) {
      case 0:
        fill(255, 0, 0);
        break;
      case 1:
        fill(0, 0, 255);
        break;
      case 2:
        fill(0, 255, 0);
        break;
      case 3:
        fill(255, 0, 255);
        break;
      case 4:
        fill(255, 255, 0);
        break;
      case 5:
        fill(0, 255, 255);
        break;
      case 6:
        fill(127, 0, 255);
        break;
      case 7:
        fill(255, 0, 127);
        break;
    }
    circle(cells[i][0], cells[i][1], 5);
  }
}
