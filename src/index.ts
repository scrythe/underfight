import Game from './game';

const canvas = document.querySelector('canvas')!;
const ctx = canvas.getContext('2d')!;

const playerImage: HTMLImageElement = document.querySelector('#player-image')!;

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

let lasttime = 0;
const game = new Game(WIDTH, HEIGHT, playerImage);

function gameLoop(timestamp: number) {
  const deltatime = timestamp - lasttime;
  lasttime = timestamp;

  game.update(deltatime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
