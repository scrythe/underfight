import http from 'http';
import { Server } from 'socket.io';
import gameLoop from './gameLoop';

const server = http.createServer();

const options = {
  cors: {
    origin: ['http://localhost'],
  },
};
const io = new Server(server, options);

io.on('connection', (socket) => {
  gameLoop(io);
});

io.listen(3000);
