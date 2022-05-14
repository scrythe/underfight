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

const name = `User-${Math.random()}`;

socket.on('connect', () => {
  socket.emit('joinGame', name);
  const drawGame = new DrawGame(ctx, WIDTH, HEIGHT, name);
  const inputHandler = new InputHandler(WIDTH, HEIGHT);

  socket.on('sendState', (state) => {
    drawGame.draw(state);
    socket.emit('sendKeys', inputHandler.keys, inputHandler.angle, name);
    inputHandler.fire = { pressed: false };
  });
});
