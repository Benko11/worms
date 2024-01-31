import { Player } from "./Player";
import "./style.css";
import { Canvas } from "./interfaces/Canvas";

const playField = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = playField.getContext("2d") as CanvasRenderingContext2D;

initCanvas(800, [4, 3]);
ctx.lineWidth = 3;

const canvasSetup: Canvas = {
  ctx,
  width: playField.width,
  height: playField.height,
};

const player1 = new Player(
  canvasSetup,
  { x: 400, y: 400 },
  {
    left: "arrowleft",
    right: "arrowright",
  },
  "hsl(212, 96%, 78%)"
);
player1.start();

const player2 = new Player(
  canvasSetup,
  { x: 200, y: 200 },
  { left: "z", right: "x" },
  "hsl(142, 71%, 45%)"
);
player2.start();

function initCanvas(width: number, aspectRatio: number[]): void {
  playField.width = width;
  const height = (width / aspectRatio[0]) * aspectRatio[1];
  playField.height = height;
}
