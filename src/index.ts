import Player from './player';

const canvas = document.querySelector('canvas')!;
const ctx = canvas.getContext('2d')!;

const WIDTH = 800;
const HEIGHT = 600;

canvas.width = WIDTH;
canvas.height = HEIGHT;

let lasttime = 0;

const player = new Player(WIDTH, HEIGHT);

function gameLoop(timestamp: number) {
  const deltatime = timestamp - lasttime;
  lasttime = timestamp;

  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  player.update(deltatime);
  player.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
