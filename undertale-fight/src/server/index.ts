import { createServer } from 'http';
import Game from './game';
import { Server } from 'socket.io';
import { ServerInterface, SocketInterface } from '../shared/serverInterface';
import { AttackType } from '../shared/interface';

const server = createServer();

const options = {
  cors: {
    origin: ['http://localhost'],
  },
};

const io: ServerInterface = new Server(server, options);

let connectedSockets: SocketInterface[] = [];

function isFull() {
  const connectedSocketsAmount = connectedSockets.length;
  if (connectedSocketsAmount >= 2) return true;
  return false;
}

io.on('connection', (socket) => {
  if (isFull()) return;
  connectedSockets.push(socket);
  if (isFull()) startGame();
});

function startGame() {
  const [attacker, runner] = connectedSockets;
  if (!attacker) return;
  if (!runner) return;

  const attackList: AttackType[] = ['BoneStab', 'BoneWave', 'BoneJumpWave'];

  const rndmAttackNum = Math.floor(Math.random() * attackList.length);
  const rndmAttack = attackList[rndmAttackNum];

  if (!rndmAttack) return;

  const game = new Game(attacker, runner, rndmAttack);
  game.startGame();
}

io.listen(3000);
