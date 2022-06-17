import { Server } from 'socket.io';
import express from 'express';
import Game from './game';
import { ServerInterface, SocketInterface } from '../shared/socketInterface';
import cors from 'cors';
import { getUser, isUser } from './user';
import { User } from './interfaces';

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
  socket.on('joinGame', async (userToken) => {
    const user = await getUser(userToken);
    if (!isUser(user)) return;
    onNewPlayer(socket, user);
  });
  socket.on('disconnect', () => game.removePlayer(socket.id));
});

function onNewPlayer(socket: SocketInterface, user: User) {
  game.addPlayer(user.username, socket.id);
  socket.on('sendKeys', (keys, angle) =>
    game.handleInput(keys, angle, socket.id)
  );
}
