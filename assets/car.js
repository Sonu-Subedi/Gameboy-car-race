const container = document.querySelector(".container");
let canvasWidth = 800;
let canvasHeight = 600;
let context;
let backgroundImage;
let backgroundY = 0;

const lanes = [180, 290, 420, 540]; // Define the x-positions of the lanes
let currentLaneIndex = Math.floor(lanes.length / 2); // Start user car in the middle lane
let userCarY = canvasHeight - 100;
const userCarWidth = 80;
const userCarHeight = 100;

const userCarImage = new Image();
userCarImage.src = "assets/Car2.png";

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
}

function initializeGame() {
  gameLoop();
}

function handleKeyPress(event) {
  if (event.key === "ArrowLeft" && currentLaneIndex > 0) {
    currentLaneIndex--; // Shift the car left by one lane
  } else if (
    event.key === "ArrowRight" &&
    currentLaneIndex < lanes.length - 1
  ) {
    currentLaneIndex++; // Shift the car right by one lane
  }
}

function gameLoop() {
  clearCanvas();

  backgroundY += 5;
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

  // Draw user car in the current lane
  context.drawImage(
    userCarImage,
    lanes[currentLaneIndex],
    userCarY,
    userCarWidth,
    userCarHeight
  );

  requestAnimationFrame(gameLoop);
}

function clearCanvas() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
}

window.onload = () => {
  gameStart();
};
