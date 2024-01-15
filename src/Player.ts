export class Player {
  colour: string;
  position: { x: number; y: number };
  ctx: CanvasRenderingContext2D;

  constructor(colour: string, ctx: CanvasRenderingContext2D) {
    this.colour = colour;
    this.position = { x: 50, y: 50 };
    this.ctx = ctx;
  }

  start() {
    const movement = [Math.random(), Math.random()];
    console.log(movement);

    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = this.colour;
    setInterval(() => {
      this.ctx.beginPath();
      this.ctx.moveTo(this.position.x, this.position.y);
      this.ctx.lineTo(
        this.position.x + Math.floor(movement[0] * 30),
        this.position.y + Math.floor(movement[1] * 30)
      );
      this.ctx.stroke();
    }, 500);
  }
}
