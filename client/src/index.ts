import { io, Socket } from 'socket.io-client';
import { State } from './interfaces';
import DrawGame from './drawGame';
import {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from './socketInterface';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://localhost:3000'
);

const canvas = document.querySelector('canvas')!;
const ctx = canvas.getContext('2d')!;

const WIDTH = 1920;
const HEIGHT = 1080;

canvas.width = WIDTH;
canvas.height = HEIGHT;

socket.on('sendState', (state) => {
  drawGame.draw(state);
});

const drawGame = new DrawGame(ctx, WIDTH, HEIGHT);

// function gameLoop() {
//   drawGame.draw();
//   requestAnimationFrame(gameLoop);
// }
