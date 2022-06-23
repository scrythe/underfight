import RectObject, { Rect } from '../../shared/rectangle';
import InputHandler from './inputs';
import { Keys } from '../../shared/interface';
import Player from './player';
import FightBox from './fightBox';
import BoneWave from './boneWave';
import JsonData from '../gameShared/jsonData';
import { State } from '../../shared/stateInterface';
import { ServerInterface, SocketInterface } from '../../shared/serverInterface';
import { Server } from 'socket.io';
import GameEventEmitter from './gameEventEmitter';
import { GameConst } from '../../shared/gameConstants';

enum GameState {
  running,
  stopped,
}

class Game {
  private gameEventEmitter: GameEventEmitter;
  private screen: Rect;
  private jsonData: JsonData;
  private fightBox: FightBox;
  private keys: Keys;
  private player: Player;
  private bonesWave: BoneWave;
  private previous: number;
  private lag: number;
  private FPS = 60;
  private MS_PER_UPDATE = 1000 / this.FPS;
  private io: Server;
  private gameState: GameState;
  private WIDTH = GameConst.width;
  private HEIGHT = GameConst.height;
  private inputHandler: InputHandler;

  constructor(io: ServerInterface) {
    const screenObject = new RectObject(this.WIDTH, this.HEIGHT);
    const screenPos = {
      x: 0,
      y: 0,
    };
    this.gameEventEmitter = new GameEventEmitter();
    this.screen = screenObject.getRect({ topLeft: screenPos });
    this.jsonData = new JsonData();
    this.inputHandler = new InputHandler(this.gameEventEmitter);
    this.keys = this.inputHandler.keys;
    this.fightBox = new FightBox(this.screen);
    this.player = new Player(this.fightBox.innerBox);
    this.bonesWave = new BoneWave(this.jsonData.bonesData);
    this.previous = performance.now();
    this.lag = 0;
    this.io = io;
    this.gameState = GameState.stopped;
  }

  startGame() {
    this.gameState = GameState.running;
    this.loopGame();
  }

  stopGame() {
    this.gameState = GameState.stopped;
  }

  loadFrame(frame: number) {
    this.stopGame();
    this.restart();
    for (let currentFrame = 0; currentFrame <= frame; currentFrame++) {
      this.update();
    }
    this.startGame();
    this.previous = performance.now();
  }

  restart() {
    this.jsonData.reloadFile();
    this.bonesWave.restart(this.jsonData.bonesData);
  }

  loopGame() {
    if (this.gameState == GameState.stopped) return;
    const current = performance.now();
    const timeDiffrence = current - this.previous;
    this.lag += timeDiffrence;
    while (this.lag >= this.MS_PER_UPDATE) {
      this.update();
      const gameState = this.getState();
      this.io.emit('sendState', gameState);
      this.lag -= this.MS_PER_UPDATE;
    }
    this.previous = current;
    setImmediate(() => this.loopGame());
  }

  update() {
    this.player.update(this.keys);
    this.bonesWave.update();
  }

  switchSocket(socket: SocketInterface) {
    socket.on('sendKey', (...params) => {
      this.gameEventEmitter.emit('sendKey', ...params);
    });
  }

  getState(): State {
    const playerState = this.player.getPlayerState();
    const boneStates = this.bonesWave.getBoneStates();
    const state = { playerState, boneStates };
    return state;
  }
}

export default Game;
