import { io } from 'socket.io-client';
import DrawGame from './drawGame';
import { ClientInterface } from '../shared/socketInterface';
import InputHandler from './input';

const socket: ClientInterface = io('http://localhost:3000');

const canvas = document.querySelector('canvas')!;
const ctx = canvas.getContext('2d')!;

const WIDTH = 1536;
const HEIGHT = 864;

canvas.width = WIDTH;
canvas.height = HEIGHT;

const drawGame = new DrawGame(ctx, WIDTH, HEIGHT);
const inputHandler = new InputHandler(WIDTH, HEIGHT);

socket.on('sendState', (state) => {
  drawGame.draw(state);
  socket.emit('sendKeys', inputHandler.keys, inputHandler.mousePos);
  inputHandler.fire = { pressed: false };
});
