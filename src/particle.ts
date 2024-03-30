export default class Particle {
  protected gravity = 0.03;
  protected friction = 0.99;
  protected alpha = 1;
  constructor(
    protected data: {
      ctx: CanvasRenderingContext2D;
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: { x: number; y: number };
    }
  ) {}

  draw() {
    const { ctx, radius, x, y, color } = this.data;
    ctx.save();
    ctx.globalAlpha = this.alpha;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();

    ctx.restore();
  }

  update() {
    this.draw();
    this.data.velocity.y += this.gravity;
    this.data.velocity.x *= this.friction;
    this.data.x += this.data.velocity.x;
    this.data.y += this.data.velocity.y;

    this.alpha -= 0.01;
  }

  isFaded() {
    return this.alpha <= 0;
  }

  isOutOfBounds() {
    const { x, y } = this.data;

    return x < 0 || x > innerWidth || y < 0 || y > innerHeight;
  }
}
