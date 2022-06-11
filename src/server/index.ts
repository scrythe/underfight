import { Server } from 'socket.io';
import express from 'express';
import Game from './game';
import { ServerInterface } from '../shared/socketInterface';
import cors from 'cors';

const corsOptions = {
  origin: ['https://web003.wifiooe.at', 'http://localhost:3000'],
};

const PORT = process.env.PORT || 3000;

const server = express()
  .use(cors(corsOptions))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io: ServerInterface = new Server(server, {
  cors: {
    origin: ['https://web003.wifiooe.at', 'http://localhost:3000'],
  },
});

const game = new Game(io);
game.startGame();

io.on('connection', (socket) => {
  socket.on('joinGame', () => game.addPlayer(socket.id));
  socket.on('disconnect', () => game.removePlayer(socket.id));
  socket.on('sendKeys', (keys, angle) =>
    game.handleInput(keys, angle, socket.id)
  );
});
