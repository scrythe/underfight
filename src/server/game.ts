import { CameraInterface, Position, Keys } from './interfaces';
import { PlayerState, BulletState, State } from '../shared/stateInterfaces';
import { ServerInterface } from '../shared/socketInterface';
import Player from './player';
import InputHandler from './input';

class Game {
  private GAME_WIDTH = 1536;
  private GAME_HEIGHT = 864;
  private FPS = 60;

  private player: Player;
  private players: Player[];
  private inputHandler: InputHandler;

  private io: ServerInterface;

  constructor(io: ServerInterface) {
    this.player = new Player(this.GAME_WIDTH, this.GAME_HEIGHT);
    this.players = [];

    this.io = io;

    this.inputHandler = new InputHandler(this.GAME_WIDTH, this.GAME_HEIGHT);
  }

  startGame() {
    const fpsDuration = 1000 / this.FPS;
    setInterval(() => {
      this.update();
      const gameState = this.getState();
      this.io.emit('sendState', gameState);
    }, fpsDuration);
  }

  updatePlayers() {
    this.players.forEach((player) => {
      this.player.update();
      this.player.move(this.inputHandler.keys);
      this.player.shootBullet(this.inputHandler.fire);
    });
  }

  update() {
    this.player.update();
    this.player.move(this.inputHandler.keys);
    this.player.shootBullet(this.inputHandler.fire);
    this.calculateAngle();
  }

  private calculateAngle() {
    const mousePos = this.inputHandler.mousePos;
    const x = mousePos.x - this.GAME_WIDTH / 2;
    const y = mousePos.y - this.GAME_HEIGHT / 2;
    const angle = Math.atan2(y, x);
    this.player.angle = angle;
  }

  private getAllBulletStates() {
    const bulletsState: BulletState[] = [];
    this.player.bullets.forEach((bullet) => {
      const bulletRect = {
        center: bullet.rect.center,
        width: bullet.rect.width,
        height: bullet.rect.height,
      };
      const bulletState = { rect: bulletRect, angle: bullet.angle };
      bulletsState.push(bulletState);
    });
    return bulletsState;
  }

  getState(): State {
    const playerRect = {
      center: this.player.rect.center,
      width: this.player.rect.width,
      height: this.player.rect.height,
    };
    const playerState: PlayerState = {
      rect: playerRect,
      angle: this.player.angle,
    };
    const bulletsState: BulletState[] = this.getAllBulletStates();
    const state: State = { playerState, bulletsState };
    return state;
  }

  handleInput(keys: Keys, mousePos: Position) {
    this.inputHandler.updateKeys(keys);
    this.inputHandler.updateMousePos(mousePos);
  }

  addPlayer() {}
}

export default Game;
