import { Canvas } from "./interfaces/Canvas";
import { Controls } from "./interfaces/Controls";
import { Vector } from "./interfaces/Vector";
import { getRandomVector } from "./utils/getRandomVector";
import { getVectorSize } from "./utils/getVectorSize";
import { rotateVector } from "./utils/rotateVector";
type Position = Vector;

export class Player {
  canvasSetup: Canvas;
  pos: Position;
  controls: Controls;
  colour: string;
  vector: Vector;

  isLeftKeyDown = false;
  isRightKeyDown = false;

  constructor(
    canvasSetup: Canvas,
    pos: Position,
    controls: Controls,
    colour: string
  ) {
    this.canvasSetup = canvasSetup;
    this.pos = pos;
    this.controls = controls;
    this.colour = colour;
    this.vector = getRandomVector();
  }

  handleControls(e: KeyboardEvent, down: boolean) {
    if (e.key.toLowerCase() === this.controls.left) this.isLeftKeyDown = down;
    else if (e.key.toLowerCase() === this.controls.right)
      this.isRightKeyDown = down;
  }

  handlePress(e: KeyboardEvent) {
    this.handleControls(e, true);
  }

  handleRelease(e: KeyboardEvent) {
    this.handleControls(e, false);
  }

  start() {
    console.log(this.colour);
    const { ctx, width, height } = this.canvasSetup;

    document.addEventListener("keydown", (e) => this.handlePress(e));
    document.addEventListener("keyup", (e) => this.handleRelease(e));

    const interval = setInterval(() => {
      ctx.strokeStyle = this.colour;

      ctx.beginPath();
      ctx.moveTo(this.pos.x, this.pos.y);

      const vectorSize = getVectorSize(this.vector);

      const lookingX = this.pos.x + (2 * this.vector.x) / vectorSize;
      const lookingY = this.pos.y + (2 * this.vector.y) / vectorSize;

      const xxx = ctx.getImageData(lookingX, lookingY, 1, 1).data;
      if (xxx[0] > 0) {
        clearInterval(interval);
        return;
      }

      this.pos.x += this.vector.x / vectorSize;
      this.pos.y += this.vector.y / vectorSize;
      ctx.lineTo(this.pos.x, this.pos.y);
      ctx.stroke();

      // rotate
      const angle = 2.5;

      if (this.isLeftKeyDown) {
        this.vector = rotateVector(this.vector, -angle);
      } else if (this.isRightKeyDown) {
        this.vector = rotateVector(this.vector, angle);
      }

      if (
        this.pos.x < 0 ||
        this.pos.y < 0 ||
        this.pos.x > width ||
        this.pos.y > height
      )
        clearInterval(interval);
    }, 20);
  }
}
