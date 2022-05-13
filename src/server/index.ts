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
  socket.on('joinGame', (name) => game.addPlayer(name));
  socket.on('sendKeys', (keys, mousePos, name) =>
    game.handleInput(keys, mousePos, name)
  );
});

io.listen(3000);
