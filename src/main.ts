import { Player } from "./Player";
import "./style.css";

interface Vector {
  x: number;
  y: number;
}
const playField = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = playField.getContext("2d") as CanvasRenderingContext2D;

initCanvas(800, [4, 3]);
ctx.lineWidth = 3;

function start1() {
  const pos = [400, 400];
  const vector = getRandomVector();

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      decVector(vector);
    }

    if (e.key === "ArrowRight") {
      incVector(vector);
    }
  });

  const interval = setInterval(() => {
    ctx.strokeStyle = "hsl(212, 96%, 78%)";

    ctx.beginPath();
    ctx.moveTo(pos[0], pos[1]);

    const vectorSize = Math.sqrt(vector.x ** 2 + vector.y ** 2);
    console.log(vectorSize);
    pos[0] += vector.x / vectorSize;
    pos[1] += vector.y / vectorSize;
    ctx.lineTo(pos[0], pos[1]);
    ctx.stroke();

    if (
      pos[0] < 0 ||
      pos[1] < 0 ||
      pos[0] > playField.width ||
      pos[1] > playField.height
    )
      clearInterval(interval);
  }, 10);
}

start1();

// const player = new Player("hsl(212, 96%, 78%)", ctx);
// player.start();

function initCanvas(width: number, aspectRatio: number[]): void {
  playField.width = width;
  const height = (width / aspectRatio[0]) * aspectRatio[1];
  playField.height = height;
}

function getRandomVector(): Vector {
  return {
    x: Math.random() * 2 - 1,
    y: Math.random() * 2 - 1,
  };
}

function incVector(vector: Vector, delta = 0.01) {
  const angle = Math.atan2(vector.y, vector.x);
  vector.x += Math.cos(angle);
}

function decVector(vector: Vector, delta = 0.01) {
  const angle = Math.atan2(vector.y, vector.x);
  vector.x -= Math.sin(angle);
}
