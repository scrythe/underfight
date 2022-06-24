import RectObject, { Rect } from '../../shared/rectangle';
import InputHandler from './inputs';
import { AttackType, Keys } from '../../shared/undertale-fight/interface';
import Player from './player';
import FightBox from './fightBox';
import BoneGroup from './boneGroup';
import JsonData from './jsonData';
import { State } from '../../shared/undertale-fight/stateInterface';
import { SocketInterface } from '../../shared/socketInterface';
import { GameConst } from '../../shared/undertale-fight/gameConstants';
import checkAABBCollision from '../aabb';

type GameState = 'running' | 'stopped';

class Game {
  private attacker: SocketInterface;
  private runner: SocketInterface;
  private screen: Rect;
  private jsonData: JsonData;
  private fightBox: FightBox;
  private keys: Keys;
  private player: Player;
  private boneGroup: BoneGroup;
  private previous: number;
  private lag: number;
  private FPS = 60;
  private MS_PER_UPDATE = 1000 / this.FPS;
  private _gameState: GameState;
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
    this.boneGroup = new BoneGroup(this.jsonData.bonesData);
    this.previous = performance.now();
    this.lag = 0;
    this._gameState = 'stopped';

    if (attack == 'BoneWave') this.player.switchHeart('RedHeart');
    else this.player.switchHeart('BlueHeart');
  }

  startGame() {
    this._gameState = 'running';
    this.loopGame();
  }

  stopGame() {
    this._gameState = 'stopped';
    this.runner.removeAllListeners('sendKeysUndertale');
  }

  checkCollision() {
    const bones = this.boneGroup.bones;
    bones.forEach((bone) => {
      const boneRect = bone.rect;
      const playerRect = this.player.rect;
      const collision = checkAABBCollision(boneRect, playerRect);
      if (collision) return;
    });
  }

  loopGame() {
    if (this._gameState == 'stopped') return;
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
    this.attacker.emit('sendStateUndertale', gameState);
    this.runner.emit('sendStateUndertale', gameState);
  }

  update() {
    this.player.update(this.keys);
    this.boneGroup.update();
    this.checkCollision();
    if (this.boneGroup.bonesGone()) this.stopGame();
  }

  getState(): State {
    const playerState = this.player.getPlayerState();
    const boneStates = this.boneGroup.getBoneStates();
    const state = { playerState, boneStates };
    return state;
  }

  get gameState() {
    return this._gameState;
  }

  get attackerSocketID() {
    return this.attacker.id;
  }

  get runnerSocketID() {
    return this.runner.id;
  }
}

export default Game;
