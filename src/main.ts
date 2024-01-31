import "./style.css";

interface Vector {
  x: number;
  y: number;
}
const playField = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = playField.getContext("2d") as CanvasRenderingContext2D;

initCanvas(800, [4, 3]);
ctx.lineWidth = 3;

const player1: Player = {};

function start1() {
  const pos = [400, 400];
  let vector = getRandomVector();
  let isRightKeyDown = false;
  let isLeftKeyDown = false;

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      isLeftKeyDown = true;
    }

    if (e.key === "ArrowRight") {
      isRightKeyDown = true;
    }
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") {
      isLeftKeyDown = false;
    }

    if (e.key === "ArrowRight") {
      isRightKeyDown = false;
    }
  });

  const interval = setInterval(() => {
    ctx.strokeStyle = "hsl(212, 96%, 78%)";

    ctx.beginPath();
    ctx.moveTo(pos[0], pos[1]);

    const vectorSize = Math.sqrt(vector.x ** 2 + vector.y ** 2);

    const lookingX = pos[0] + (1.5 * vector.x) / vectorSize;
    const lookingY = pos[1] + (1.5 * vector.y) / vectorSize;

    const xxx = ctx.getImageData(lookingX, lookingY, 1, 1).data;
    console.log(xxx);
    if (xxx[0] > 0) {
      clearInterval(interval);
      return;
    }

    pos[0] += vector.x / vectorSize;
    pos[1] += vector.y / vectorSize;
    ctx.lineTo(pos[0], pos[1]);
    ctx.stroke();

    // rotate
    const angle = 2.5;

    if (isLeftKeyDown) {
      vector = rotateVector(vector, -angle);
    } else if (isRightKeyDown) {
      vector = rotateVector(vector, angle);
    }

    if (
      pos[0] < 0 ||
      pos[1] < 0 ||
      pos[0] > playField.width ||
      pos[1] > playField.height
    )
      clearInterval(interval);
  }, 20);
}

function start2() {
  const pos = [200, 350];
  let vector = getRandomVector();
  let isRightKeyDown = false;
  let isLeftKeyDown = false;

  document.addEventListener("keydown", (e) => {
    if (e.key === "z") {
      isLeftKeyDown = true;
    }

    if (e.key === "x") {
      isRightKeyDown = true;
    }
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === "z") {
      isLeftKeyDown = false;
    }

    if (e.key === "x") {
      isRightKeyDown = false;
    }
  });

  const interval = setInterval(() => {
    ctx.strokeStyle = "hsl(142, 71%, 45%)";

    ctx.beginPath();
    ctx.moveTo(pos[0], pos[1]);

    const vectorSize = Math.sqrt(vector.x ** 2 + vector.y ** 2);

    const lookingX = pos[0] + (1.5 * vector.x) / vectorSize;
    const lookingY = pos[1] + (1.5 * vector.y) / vectorSize;

    const xxx = ctx.getImageData(lookingX, lookingY, 1, 1).data;
    console.log(xxx);
    if (xxx[0] > 0) {
      clearInterval(interval);
      return;
    }

    pos[0] += vector.x / vectorSize;
    pos[1] += vector.y / vectorSize;
    ctx.lineTo(pos[0], pos[1]);
    ctx.stroke();

    // rotate
    const angle = 3;

    if (isLeftKeyDown) {
      vector = rotateVector(vector, -angle);
    } else if (isRightKeyDown) {
      vector = rotateVector(vector, angle);
    }

    if (
      pos[0] < 0 ||
      pos[1] < 0 ||
      pos[0] > playField.width ||
      pos[1] > playField.height
    )
      clearInterval(interval);
  }, 20);
}

start1();
start2();

// const player = new Player("hsl(212, 96%, 78%)", ctx);
// player.start();

function initCanvas(width: number, aspectRatio: number[]): void {
  playField.width = width;
  const height = (width / aspectRatio[0]) * aspectRatio[1];
  playField.height = height;
}

function getRandomVector(): Vector {
  const angle = Math.random() * 2 * Math.PI;
  return {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
}

function rotateVector(vector: Vector, angleDegrees: number) {
  const angle = (Math.PI / 180) * angleDegrees;

  const newVector: Vector = {
    x: vector.x * Math.cos(angle) - vector.y * Math.sin(angle),
    y: vector.x * Math.sin(angle) + vector.y * Math.cos(angle),
  };

  return newVector;
}
