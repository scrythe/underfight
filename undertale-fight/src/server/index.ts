import { createServer } from 'http';
import Game from './game';
import { Server } from 'socket.io';
import { ServerInterface, SocketInterface } from '../shared/serverInterface';

const server = createServer();

const options = {
  cors: {
    origin: ['http://localhost'],
  },
};

const io: ServerInterface = new Server(server, options);

let connectedSockets: SocketInterface[] = [];

function isFull() {
  const connectedSocketsAmount = connectedSockets.length;
  if (connectedSocketsAmount >= 1) return true;
  return false;
}

io.on('connection', (socket) => {
  if (isFull()) return;
  connectedSockets.push(socket);
  if (isFull()) startGame();
});

function startGame() {
  const [runner] = connectedSockets;
  if (!runner) return;
  const game = new Game(io, runner);
  game.startGame();
}

io.listen(3000);
