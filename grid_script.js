var colors = ["red", "green", "blue", "purple", "lime", "pink", "maroon", "aqua", "fuchsia", "crimson", "cyan"]
var snake;
var canvasWidth = 600;
var canvasHeight = 400;
var randX;
var randY;
var angleToPoint;
var xsub=0;
var ysub=0;
var distance=0;
var maxDist=0
var progress=distance/maxDist;
var frame=0;



/***********************************************************/
/***********************************************************/

var myCanvasArea = {
  canvas : document.getElementById("myCanvasArea"),
  start : function() {
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.canvas.style.background = "white";
    this.context = this.canvas.getContext("2d");
    function updateCanvas() {
      snake.update();
      requestAnimationFrame(updateCanvas);
    }
  requestAnimationFrame(updateCanvas);
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speed = 1;
  this.angle = angleToPoint;
  this.moveAngle = 1;
  this.update = function() {
    requestAnimationFrame(updateCanvas);
    context = myCanvasArea.context;
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.fillStyle = color;
    context.fillRect(this.width/-2, this.height/-2, this.width, this.height);
    context.restore();
  }
  this.newPos = function() {
    calcAngle(snake.x, snake.y, randX, randY);
    progress = (distance/maxDist);
    calcSpeed(progress);
    this.x += this.speed * Math.sin(this.angle);
    this.y -= this.speed * Math.cos(this.angle);
  }
}



/***********************************************************/
/***********************************************************/

function calcSpeed(x) { 
  snake.speed =  2*(Math.sin((Math.PI)*x))+1;
  distance = calcDist(Math.floor(snake.x), Math.floor(snake.y), randX, randY); 
}

function calcDist(x, y, nx, ny) { return Math.sqrt((x - nx)*(x - nx) + (y - ny)*(y - ny)); }

function calcAngle(x, y, nx, ny) {
  angleToPoint = ((Math.atan2(ny - y, nx - x) * 180 / Math.PI));
  snake.angle = angleToPoint;
}

function changeColor(x) {
  if (frame!=5000) { frame++; }
  else { tempx=snake.x; tempy=snake.y; snake = new component(6, 6, randomColor(), tempx, tempy); frame=0; }
}

function randomColor() { return colors[Math.floor(Math.random()*(colors.length))]; }

function randomCoords() {
  randX = Math.floor(Math.random() * canvasWidth) + 1;
  randY = Math.floor(Math.random() * canvasHeight) + 1;
}

function checkComplete() { 
  if ((distance <= (20+snake.speed))||(distance <= (20-snake.speed))) { 
    randomCoords(); 
    maxDist = calcDist(snake.x, snake.y, randX, randY);
  } 
}

/***********************************************************/
/***********************************************************/

function startSnake() {
  myCanvasArea.start();
  snake = new component(6, 6, randomColor(), 290, 100);
  randomCoords();
}

function updateCanvas() {
  changeColor(frame);
  checkComplete();
  snake.newPos();
}

startSnake();