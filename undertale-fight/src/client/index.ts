import { io } from 'socket.io-client';
import { ClientInterface } from '../shared/serverInterface';
import Game from './game';

const socket: ClientInterface = io('http://localhost:3000');

const canvas = document.querySelector('canvas')!;

const game = new Game(canvas, socket);

socket.on('connect', () => {
  socket.emit('startGame');
  socket.on('sendState', (state) => {
    game.draw(state);
  });
});
