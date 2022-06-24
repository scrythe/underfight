import { io } from 'socket.io-client';
import Game from './game';
import { ClientInterface } from '../shared/socketInterface';
import InputHandler from './input';
import './assets/logo.png';
import './style/style.css';
import { onLogin } from './main';

import ClientEventEmitter from './clientEventEmitter';
import { getUser, isUser } from './user';
import { User } from './interfaces';
import Images from './assets';
import { State } from '../shared/stateInterfaces';
import UndertaleGame from './undertale-fight/game';
import { State as UndertaleState } from '../shared/undertale-fight/stateInterface';

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

async function startSocketGame() {
  const userToken = sessionStorage.getItem('token');
  if (!userToken) return;

  const user = await getUser(userToken);
  if (!isUser(user)) return;

  const socket: ClientInterface = io(socketUrl);

  socket.on('connect', () => {
    onConnect(socket, userToken, user);
  });
}

async function onConnect(
  socket: ClientInterface,
  userToken: string,
  user: User
) {
  socket.emit('joinGame', userToken);

  await Images.preloadAssets();
  const images = new Images();

  const game = new Game(ctx, WIDTH, HEIGHT, user.username, ctxUI, images);
  const undertaleGame = new UndertaleGame(canvas, socket);

  const inputHandler = new InputHandler(WIDTH, HEIGHT);

  function sendStateFunction(state: State) {
    requestAnimationFrame(() => {
      game.draw(state);
    });
    socket.emit('sendKeys', inputHandler.keys, inputHandler.angle);
    inputHandler.fire = { pressed: false };
  }

  function sendUndertaleStateFunction(state: UndertaleState) {
    requestAnimationFrame(() => undertaleGame.draw(state));
  }

  socket.on('sendState', (state) => sendStateFunction(state));

  socket.on('switchMode', (mode) => {
    const canvas = document.querySelector('canvas')!;
    const body = document.querySelector('body')!;
    if (mode == 'undertale') {
      canvas.classList.add('undertale-fight');
      body.classList.add('undertale-fight');
      canvas.width = 960;
      canvas.height = 720;
      socket.off('sendState');
      socket.on('sendStateUndertale', (state) =>
        sendUndertaleStateFunction(state)
      );
    } else {
      canvas.width = WIDTH;
      canvas.height = HEIGHT;
      canvas.classList.remove('undertale-fight');
      body.classList.remove('undertale-fight');
      socket.off('sendStateUndertale');
      socket.on('sendState', (state) => sendStateFunction(state));
      game.reloadFont();
    }
  });
}

startSocketGame();
