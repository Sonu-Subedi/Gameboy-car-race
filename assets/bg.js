const container = document.querySelector(".container");
let canvasWidth = 1000;
let canvasHeight = 700;
let context;
let backgroundImage;
let backgroundY = 0;

function gameStart() {
  const canvas = document.getElementById("canvas");
  canvas.height = canvasHeight;
  canvas.width = canvasWidth;
  context = canvas.getContext("2d");

  backgroundImage = new Image();
  backgroundImage.src = "../assets/bg.jpg";
  backgroundImage.onload = () => {
    gameLoop();
  };
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

  requestAnimationFrame(gameLoop);
}

function clearCanvas() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
}

window.onload = () => {
  gameStart();
};
