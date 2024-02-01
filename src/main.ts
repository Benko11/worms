import "./style.css";
import { Player } from "./interfaces/Player";
import { getRandomVector } from "./utils/getRandomVector";
import { getVectorSize } from "./utils/getVectorSize";
import { rotateVector } from "./utils/rotateVector";

const playField = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = playField.getContext("2d") as CanvasRenderingContext2D;
const scoreBoard = document.querySelector("#scoreboard") as HTMLDivElement;
const scoreTemplate = document.querySelector("#score") as HTMLTemplateElement;

initCanvas(800, [4, 3]);
ctx.lineWidth = 3;

const players: Player[] = [
  {
    name: "Benko",
    controls: { left: "arrowleft", right: "arrowright" },
    direction: getRandomVector(),
    pos: { x: 400, y: 400 },
    colour: "hsl(217, 91%, 60%)",
  },
  {
    name: "Cxivo",
    controls: { left: "z", right: "x" },
    direction: getRandomVector(),
    pos: { x: 200, y: 200 },
    colour: "hsl(142, 71%, 45%)",
  },
  {
    name: "Source",
    controls: { left: "n", right: "m" },
    direction: getRandomVector(),
    pos: { x: 200, y: 300 },
    colour: "hsl(271, 91%, 65%)",
  },
  {
    name: "Slada",
    controls: { left: "1", right: "2" },
    direction: getRandomVector(),
    pos: { x: 100, y: 300 },
    colour: "hsl(0, 84%, 60%)",
  },
];

players.forEach((player, index) => {
  initPlayer(player, index);
  draw(player);
});

function draw(player: Player) {
  function handlePress(e: KeyboardEvent) {
    if (e.key.toLowerCase() === player.controls.left) player.activeKey = "LEFT";
    else if (e.key.toLowerCase() === player.controls.right)
      player.activeKey = "RIGHT";
  }

  function handleRelease(e: KeyboardEvent) {
    if (e.key.toLowerCase() === player.controls.left)
      player.activeKey = undefined;
    else if (e.key.toLowerCase() === player.controls.right)
      player.activeKey = undefined;
  }

  function clean() {
    clearInterval(interval);
    document.removeEventListener("keydown", (e) => handlePress(e));
    document.removeEventListener("keyup", (e) => handleRelease(e));
  }

  document.addEventListener("keydown", (e) => handlePress(e));
  document.addEventListener("keyup", (e) => handleRelease(e));

  const interval = setInterval(() => {
    ctx.strokeStyle = player.colour;

    ctx.beginPath();
    ctx.moveTo(player.pos.x, player.pos.y);

    const vectorSize = getVectorSize(player.direction);
    const lookingX = player.pos.x + (2 * player.direction.x) / vectorSize;
    const lookingY = player.pos.y + (2 * player.direction.y) / vectorSize;

    const pixelColour = ctx.getImageData(lookingX, lookingY, 1, 1).data;
    if (pixelColour[0] > 0) {
      clean();
      return;
    }

    if (player.activeKey != null) {
      const angle = 2.5;

      if (player.activeKey === "LEFT") {
        player.direction = rotateVector(player.direction, -angle);
      } else if (player.activeKey === "RIGHT") {
        player.direction = rotateVector(player.direction, angle);
      }
    }

    player.pos.x += player.direction.x / vectorSize;
    player.pos.y += player.direction.y / vectorSize;
    ctx.lineTo(player.pos.x, player.pos.y);
    ctx.stroke();

    if (
      player.pos.x < 0 ||
      player.pos.y < 0 ||
      player.pos.x > playField.width ||
      player.pos.y > playField.height
    )
      clean();
  }, 20);
}

function initCanvas(width: number, aspectRatio: number[]): void {
  playField.width = width;
  const height = (width / aspectRatio[0]) * aspectRatio[1];
  playField.height = height;
}

function initPlayer(player: Player) {
  player.score = 0;

  const clone = scoreTemplate.content.cloneNode(true) as HTMLDivElement;
  const cloneMain = clone.querySelector(":first-child") as HTMLDivElement;
  const cloneScore = clone.querySelector("[data-score]") as HTMLDivElement;
  const cloneName = clone.querySelector("[data-name]") as HTMLDivElement;

  cloneMain.style.color = player.colour;
  cloneName.dataset.name = player.name;
  cloneScore.dataset.score = formatScore(player.score);

  scoreBoard.appendChild(clone);
}

function formatScore(score: number): string {
  if (score < 1) return "000";
  if (score < 10) return "00" + score.toString();
  if (score < 100) return "0" + score.toString();
  return score.toString();
}
