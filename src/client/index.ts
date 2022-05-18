import { io } from 'socket.io-client';
import DrawGame from './drawGame';
import { ClientInterface } from '../shared/socketInterface';
import InputHandler from './input';

const socket: ClientInterface = io('http://localhost:3000');

const canvas: HTMLCanvasElement = document.querySelector('#game')!;
const uicanvas: HTMLCanvasElement = document.querySelector('#ui')!;
const ctx = canvas.getContext('2d')!;
const ctxUI = uicanvas.getContext('2d')!;

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

uicanvas.width = 200;
uicanvas.height = 50;

socket.on('connect', () => {
  socket.emit('joinGame');
  const drawGame = new DrawGame(ctx, WIDTH, HEIGHT, socket.id, ctxUI);
  const inputHandler = new InputHandler(WIDTH, HEIGHT);

  socket.on('sendState', (state) => {
    drawGame.draw(state);
    socket.emit('sendKeys', inputHandler.keys, inputHandler.angle);

    inputHandler.fire = { pressed: false };
  });
});
