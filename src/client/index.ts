import { io } from 'socket.io-client';
import Game from './game';
import { ClientInterface } from '../shared/socketInterface';
import InputHandler from './input';
import './assets/logo.png';
import './style/style.css';
import { onLogin } from './main';

import ClientEventEmitter from './clientEventEmitter';
const clientEventEmitter = new ClientEventEmitter();

clientEventEmitter.on('startGame', () => {
  startSocketGame();
});

onLogin(clientEventEmitter);

const socketUrl = process.env['SOCKET_URL'] || 'http://localhost:3000';

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

function startSocketGame() {
  const userToken = sessionStorage.getItem('token');
  if (!userToken) return;
  const socket: ClientInterface = io(socketUrl);

  socket.on('connect', () => {
    socket.emit('joinGame');
    const drawGame = new Game(ctx, WIDTH, HEIGHT, socket.id, ctxUI);
    const inputHandler = new InputHandler(WIDTH, HEIGHT);

    socket.on('sendState', (state) => {
      requestAnimationFrame(() => {
        drawGame.draw(state);
      });
      socket.emit('sendKeys', inputHandler.keys, inputHandler.angle);
      inputHandler.fire = { pressed: false };
    });
  });
}

startSocketGame();
