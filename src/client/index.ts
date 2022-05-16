import { io } from 'socket.io-client';
import DrawGame from './drawGame';
import { ClientInterface } from '../shared/socketInterface';
import InputHandler from './input';

const socket: ClientInterface = io('http://localhost:3000');

const canvas = document.querySelector('canvas')!;
const ctx = canvas.getContext('2d')!;

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

socket.on('connect', () => {
  socket.emit('joinGame');
  const drawGame = new DrawGame(ctx, WIDTH, HEIGHT, socket.id);
  const inputHandler = new InputHandler(WIDTH, HEIGHT);

  socket.on('sendState', (state) => {
    drawGame.draw(state);
    socket.emit('sendKeys', inputHandler.keys, inputHandler.angle);

    inputHandler.fire = { pressed: false };
  });
});
