import http from 'http';
import { Server } from 'socket.io';
import Game from './game';
import { ServerInterface } from '../shared/socketInterface';

const server = http.createServer();

const options = {
  cors: {
    origin: ['http://localhost'],
  },
};

const io: ServerInterface = new Server(server, options);

const game = new Game(io);
game.startGame();

io.on('connection', (socket) => {
  socket.on('joinGame', () => game.addPlayer());
  socket.on('sendKeys', (keys, mousePos) => game.handleInput(keys, mousePos));
});

io.listen(3000);
