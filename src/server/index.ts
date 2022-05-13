import http from 'http';
import { Server } from 'socket.io';
import gameLoop from './gameLoop';
import { ServerInterface } from '../shared/socketInterface';

const server = http.createServer();

const options = {
  cors: {
    origin: ['http://localhost'],
  },
};

const WIDTH = 1536;
const HEIGHT = 864;

const io: ServerInterface = new Server(server, options);

io.on('connection', (socket) => {
  gameLoop(io, socket);
});

io.listen(3000);
