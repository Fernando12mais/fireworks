export default class Triangle {
  constructor(
    protected data: {
      ctx: CanvasRenderingContext2D;
      x: number;
      y: number;
      size: number;
      color: string;
    }
  ) {}

  draw() {
    const { ctx, size, x, y, color } = this.data;

    ctx.beginPath();
    ctx.fillStyle = color;

    ctx.moveTo(x, y);
    ctx.lineTo(x - size / 2, y + size);
    ctx.lineTo(x + size / 2, y + size);
    ctx.fill();
    ctx.closePath();
  }
}
