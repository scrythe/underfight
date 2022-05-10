import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer();

const options = {
  cors: {
    origin: ['http://localhost'],
  },
};
const io = new Server(server, options);

io.on('connection', (socket) => {
  console.log('yeet');
});

io.listen(3000);
