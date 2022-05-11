import Game from './game';
import { Server } from 'socket.io';
import {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from './socketInterface';
import { State } from './interfaces';

const WIDTH = 1920;
const HEIGHT = 1080;
const FPS = 60;
const game = new Game(WIDTH, HEIGHT);

function gameLoop(
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
) {
  const fpsDuration = 1000 / FPS;
  const gameInterval = setInterval(() => {
    game.update();
    const gameState = game.getState();
    io.emit('sendState', gameState);
  }, fpsDuration);
}

export default gameLoop;
