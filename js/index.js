const container = document.querySelector(".container");
let canvasWidth = 800;
let canvasHeight = 600;
let context;
let backgroundImage;
let backgroundY = 0;

const lanes = [180, 290, 420, 540];
let currentLaneIndex = Math.floor(lanes.length / 2);
let userCarY = canvasHeight - 150;
let userCarSpeed = 14;
const fastUserCarSpeed = 100;
const carWidth = 120;
const carHeight = 130;

const userCarImage = new Image();
userCarImage.src = "assets/Car2.png";
const userCarX = lanes[currentLaneIndex]; // x-coordinate of user car's top-left corner

const otherCarImages = ["assets/Car1.png", "assets/Car3.png"];
const numOtherCars = 3;
const otherCars = [];

for (let i = 0; i < numOtherCars; i++) {
  const laneIndex = Math.floor(Math.random() * lanes.length);
  const xPosition = lanes[laneIndex];
  const otherCarImage = new Image();
  otherCarImage.src = otherCarImages[i % otherCarImages.length];

  otherCars.push({
    x: xPosition,
    y: (i + 1) * -200,
    image: otherCarImage,
    laneIndex: laneIndex,
  });
}

function gameStart() {
  const canvas = document.getElementById("canvas");
  canvas.height = canvasHeight;
  canvas.width = canvasWidth;
  context = canvas.getContext("2d");

  backgroundImage = new Image();
  backgroundImage.src = "assets/bg.jpg";
  backgroundImage.width = canvasWidth;
  backgroundImage.height = canvasHeight;
  backgroundImage.onload = () => {
    initializeGame();
  };

  window.addEventListener("keydown", handleKeyPress);
  window.addEventListener("keyup", handleKeyRelease);
}

function initializeGame() {
  gameLoop();
}

function handleKeyPress(event) {
  if (event.key === "ArrowLeft" && currentLaneIndex > 0) {
    currentLaneIndex--;
  } else if (
    event.key === "ArrowRight" &&
    currentLaneIndex < lanes.length - 1
  ) {
    currentLaneIndex++;
  } else if (event.key === "ArrowUp") {
    userCarSpeed = fastUserCarSpeed;
  }
}
function handleKeyRelease(event) {
  if (event.key === "ArrowUp") {
    userCarSpeed = 14;
  }
}

function checkCollision(x1, y1, otherCar) {
  const x2 = otherCar.x;
  const y2 = otherCar.y;
  if (currentLaneIndex == otherCar.laneIndex) {
    if (
      // x1 < x2 + carWidth &&
      // x1 + carWidth > x2 &&
      y1 < y2 + carHeight &&
      y1 + carHeight > y2
    ) {
      console.log(x1, x2, currentLaneIndex, otherCar.laneIndex);
      return true;
    }
  }
}

function gameLoop() {
  clearCanvas();

  backgroundY += userCarSpeed;
  if (backgroundY >= backgroundImage.height) {
    backgroundY = 0;
  }

  context.drawImage(backgroundImage, 0, backgroundY, canvasWidth, canvasHeight);
  context.drawImage(
    backgroundImage,
    0,
    backgroundY - backgroundImage.height,
    canvasWidth,
    canvasHeight
  );

  context.drawImage(
    userCarImage,
    lanes[currentLaneIndex],
    userCarY,
    carWidth,
    carHeight
  );

  // Draw other cars
  for (const otherCar of otherCars) {
    otherCar.y += 2;
    if (otherCar.y > canvasHeight) {
      otherCar.y = -200;
      otherCar.laneIndex = Math.floor(Math.random() * lanes.length);
    }
    console.log("other car", otherCar);
    console.log("main car", lanes[currentLaneIndex], userCarY);

    context.drawImage(
      otherCar.image,
      lanes[otherCar.laneIndex],
      otherCar.y,
      carWidth,
      carHeight
    );

    // Check collision between user car and other cars
    if (checkCollision(lanes[currentLaneIndex], userCarY, otherCar)) {
      gameOver();
      return;
    }
  }
  requestAnimationFrame(gameLoop);
}

function clearCanvas() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
}

function gameOver() {
  context.fillStyle = "black";
  context.fillRect(0, 0, canvasWidth, canvasHeight);
  context.font = "40px Arial";
  context.fillStyle = "red";
  context.fillText("Game Over", canvasWidth / 2 - 100, canvasHeight / 2);
}

window.onload = () => {
  gameStart();
};
