import Game from './game';
import { ServerInterface, SocketInterface } from '../shared/socketInterface';
import InputHandler from './input';

const WIDTH = 1536;
const HEIGHT = 864;
const FPS = 60;
const inputHandler = new InputHandler(WIDTH, HEIGHT);
const game = new Game(WIDTH, HEIGHT, inputHandler);

function gameLoop(io: ServerInterface, socket: SocketInterface) {
  const fpsDuration = 1000 / FPS;
  socket.on('sendKeys', (keys, mousePos) => {
    inputHandler.updateKeys(keys);
    inputHandler.updateMousePos(mousePos);
  });
  const gameInterval = setInterval(() => {
    game.update();
    const gameState = game.getState();
    io.emit('sendState', gameState);
  }, fpsDuration);
}

export default gameLoop;
