import { Server } from 'socket.io';
import express from 'express';
import Game from './game';
import { ServerInterface } from '../shared/socketInterface';
import cors from 'cors';
import { getUser, isUser } from './user';

const corsOptions = {
  origin: ['https://web003.wifiooe.at', 'http://localhost'],
};

const PORT = process.env['PORT'] || 3000;

const server = express().use(cors(corsOptions)).listen(PORT);

const io: ServerInterface = new Server(server, {
  cors: {
    origin: ['https://web003.wifiooe.at', 'http://localhost'],
  },
});

const game = new Game(io);
game.startGame();

io.on('connection', (socket) => {
  socket.on('joinGame', (userToken) => {
    getUser(userToken).then((user) => {
      if (!isUser(user)) return;
      game.addPlayer(socket.id, user.username);
    });
  });
  socket.on('disconnect', () => game.removePlayer(socket.id));
  socket.on('sendKeys', (keys, angle) =>
    game.handleInput(keys, angle, socket.id)
  );
});
