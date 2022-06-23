import RectObject, { Rect } from '../shared/rectangle';
import InputHandler from './inputs';
import { AttackType, Keys } from '../shared/interface';
import Player from './player';
import FightBox from './fightBox';
import BoneWave from './boneGroup';
import JsonData from './jsonData';
import { State } from '../shared/stateInterface';
import { SocketInterface } from '../shared/serverInterface';
import { GameConst } from '../shared/gameConstants';

enum GameState {
  running,
  stopped,
}

class Game {
  private attacker: SocketInterface;
  private runner: SocketInterface;
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
  private gameState: GameState;
  private WIDTH = GameConst.width;
  private HEIGHT = GameConst.height;
  private inputHandler: InputHandler;

  constructor(
    attacker: SocketInterface,
    runner: SocketInterface,
    attack: AttackType
  ) {
    const screenObject = new RectObject(this.WIDTH, this.HEIGHT);
    const screenPos = {
      x: 0,
      y: 0,
    };
    this.attacker = attacker;
    this.runner = runner;
    this.screen = screenObject.getRect({ topLeft: screenPos });
    this.jsonData = new JsonData(attack);
    this.inputHandler = new InputHandler(this.runner);
    this.keys = this.inputHandler.keys;
    this.fightBox = new FightBox(this.screen);
    this.player = new Player(this.fightBox.innerBox);
    this.bonesWave = new BoneWave(this.jsonData.bonesData);
    this.previous = performance.now();
    this.lag = 0;
    this.gameState = GameState.stopped;
  }

  startGame() {
    this.gameState = GameState.running;
    this.loopGame();
  }

  stopGame() {
    this.gameState = GameState.stopped;
  }

  loopGame() {
    if (this.gameState == GameState.stopped) return;
    const current = performance.now();
    const timeDiffrence = current - this.previous;
    this.lag += timeDiffrence;
    while (this.lag >= this.MS_PER_UPDATE) {
      this.update();
      const gameState = this.getState();
      this.emitState(gameState);
      this.lag -= this.MS_PER_UPDATE;
    }
    this.previous = current;
    setImmediate(() => this.loopGame());
  }

  emitState(gameState: State) {
    this.attacker.emit('sendState', gameState);
    this.runner.emit('sendState', gameState);
  }

  update() {
    this.player.update(this.keys);
    this.bonesWave.update();
  }

  getState(): State {
    const playerState = this.player.getPlayerState();
    const boneStates = this.bonesWave.getBoneStates();
    const state = { playerState, boneStates };
    return state;
  }
}

export default Game;
