import Game from './game';
import ServerInterface from './interfaces/socketInterface';

const WIDTH = 1536;
const HEIGHT = 864;
const FPS = 60;
const game = new Game(WIDTH, HEIGHT);

function gameLoop(io: ServerInterface) {
  const fpsDuration = 1000 / FPS;
  const gameInterval = setInterval(() => {
    game.update();
    const gameState = game.getState();
    io.emit('sendState', gameState);
  }, fpsDuration);
}

export default gameLoop;
