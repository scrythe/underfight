import {
  Keys,
  CameraInterface,
  Position,
  PlayerState,
  BulletState,
  State,
} from './interfaces';
import Player from './player';
import InputHandler from './input';
import Camera from './camera';

class Game {
  private gameWidth: number;
  private gameHeight: number;
  private player: Player;
  private inputHandler: InputHandler;
  private keys: Keys;
  private mousePos: Position;
  private camera: CameraInterface;
  private angle: number;

  constructor(gameWidth: number, gameHeight: number) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.player = new Player(this.gameWidth, this.gameHeight);

    this.inputHandler = new InputHandler(gameWidth, gameHeight);
    this.keys = this.inputHandler.keys;
    this.mousePos = this.inputHandler.mousePos;

    this.camera = new Camera(this.gameWidth, this.gameHeight);

    this.angle = 0;
  }

  update() {
    this.player.update();
    this.player.move(this.keys);
    this.player.shootBullet(this.inputHandler.fire);
    this.camera.watch(this.player.rect);
    this.calculateAngle();
  }

  calculateAngle() {
    const x = this.mousePos.x - this.gameWidth / 2;
    const y = this.mousePos.y - this.gameHeight / 2;
    const angle = Math.atan2(y, x);
    this.angle = angle;
    this.player.angle = this.angle;
  }

  getAllBulletStates() {
    const bulletsState: BulletState[] = [];
    this.player.bullets.forEach((bullet) => {
      const bulletRect = {
        center: bullet.rect.center,
        width: bullet.rect.width,
        height: bullet.rect.height,
      };
      const bulletState = { rect: bulletRect };
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
    const playerState: PlayerState = { rect: playerRect };
    const bulletsState: BulletState[] = this.getAllBulletStates();
    const cameraPos: Position = this.camera.pos;
    const angle = this.angle;
    const state: State = { playerState, bulletsState, cameraPos, angle };
    return state;
  }
}

export default Game;
