import { createServer } from 'http';
import Game from './game/game';
import { Server } from 'socket.io';
import { ServerInterface } from '../shared/serverInterface';

const server = createServer();

const options = {
  cors: {
    origin: ['http://localhost'],
  },
};

const io: ServerInterface = new Server(server, options);

const game = new Game(io);
game.startGame();

io.on('connection', (socket) => {
  game.switchSocket(socket);
  socket.on('startGame', () => {
    game.restart();
  });
});

io.listen(3000);
