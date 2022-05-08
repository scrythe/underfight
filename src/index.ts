import Game from './game';

const canvas = document.querySelector('canvas')!;
const ctx = canvas.getContext('2d')!;

const WIDTH = 800;
const HEIGHT = 600;

canvas.width = WIDTH;
canvas.height = HEIGHT;

let lasttime = 0;
const game = new Game(WIDTH, HEIGHT);

function gameLoop(timestamp: number) {
  const deltatime = timestamp - lasttime;
  lasttime = timestamp;

  game.update(deltatime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
