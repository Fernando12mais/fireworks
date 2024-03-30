import Triangle from "./triangle";

export default class Rocket {
  protected velocity = { x: 0, y: 1 };
  protected acceletaration = 0.1;
  protected audio: HTMLAudioElement = new Audio("rocket.mp3");
  constructor(
    protected data: {
      ctx: CanvasRenderingContext2D;
      x: number;
      y: number;
      width: number;
      height: number;
      color: { head: string; bottom: string; body: string };
      destination: { x: number; y: number };
    }
  ) {
    this.audio.play();
  }

  draw() {
    const { ctx, height, width, x, y, color } = this.data;

    const triangleSize = width * 2;
    const bottom = new Triangle({
      ctx,
      size: triangleSize,
      x: x + width / 2,
      y: y + height - triangleSize / 2,
      color: color.bottom,
    });
    bottom.draw();
    ctx.beginPath();

    ctx.fillStyle = color.body;

    ctx.roundRect(x, y, width, height, 4);
    ctx.fill();

    ctx.closePath();
    const head = new Triangle({
      ctx,
      size: triangleSize,
      x: x + width / 2,
      y: y - triangleSize,
      color: color.head,
    });
    head.draw();
  }

  update() {
    this.draw();

    this.velocity.y += this.acceletaration;
    this.data.y -= this.velocity.y;
  }

  hasReachedDestination() {
    const hasReached = this.data.y < this.data.destination.y;

    if (hasReached) {
      this.audio.pause();
    }

    return hasReached;
  }

  getDestinationPosition() {
    return this.data.destination;
  }
}
