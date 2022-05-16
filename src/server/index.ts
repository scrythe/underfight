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
  socket.on('joinGame', () => game.addPlayer(socket.id));
  socket.on('disconnect', () => game.removePlayer(socket.id));
  socket.on('sendKeys', (keys, angle) =>
    game.handleInput(keys, angle, socket.id)
  );
});

io.listen(3000);
