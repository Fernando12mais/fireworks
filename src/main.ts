import Particle from "./particle";
import Rocket from "./rocket";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = innerWidth;
canvas.height = innerHeight;
const mouse: { x: number; y: number } = { x: 0, y: 0 };
const particlesQuantity = 80;
const particlesSize = 3;
const angleIncrement = (Math.PI * 2) / particlesQuantity;
const powerOfExplosion = 16;

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

addEventListener("click", fire);
addEventListener("touchstart", (event) => fire(event.touches[0]));

let particles: Particle[] = [];
let rockets: Rocket[] = [];

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    if (particle.isFaded() || particle.isOutOfBounds()) {
      particles.splice(index, 1);
      return;
    }

    particle.update();
  });

  rockets.forEach((rocket, index) => {
    if (rocket.hasReachedDestination()) {
      const { x, y } = rocket.getDestinationPosition();
      rockets.splice(index, 1);

      particles.push(...generateParticle(x, y));
    }
    rocket.update();
  });
  requestAnimationFrame(animate);
}

function generateParticle(x: number, y: number) {
  new Audio("explosion.wav").play();
  return Array.from({ length: particlesQuantity }).map(
    (_, index) =>
      new Particle({
        ctx: ctx,
        x,
        y,
        color: `hsl(${Math.random() * 360},50%,50%)`,
        velocity: {
          x:
            Math.cos(angleIncrement * index) * Math.random() * powerOfExplosion,
          y:
            Math.sin(angleIncrement * index) * Math.random() * powerOfExplosion,
        },
        radius: particlesSize,
      })
  );
}

function getRandomColor() {
  return `hsl(${Math.random() * 360},100%,70%)`;
}

function fire(event: MouseEvent | TouchEvent["touches"][0]) {
  const p = document.querySelector("p");
  p?.remove();
  mouse.x = event.pageX;
  mouse.y = event.pageY;

  rockets.push(
    new Rocket({
      ctx,
      x: mouse.x,
      y: innerHeight,
      color: {
        head: getRandomColor(),
        body: getRandomColor(),
        bottom: getRandomColor(),
      },
      destination: { x: mouse.x, y: mouse.y },
      height: 40,
      width: 10,
    })
  );
}

animate();
