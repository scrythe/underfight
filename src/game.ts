import { Keys, CameraInterface, Position } from './interfaces';
import Player from './player';
import InputHandler from './input';
import Camera from './camera';
class Game {
  private gameWidth: number;
  private gameHeight: number;
  private player: Player;
  private testEnemy: Player;
  private inputHandler: InputHandler;
  private keys: Keys;
  private mousePos: Position;
  private camera: CameraInterface;

  constructor(
    gameWidth: number,
    gameHeight: number,
    playerImage: HTMLImageElement
  ) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.player = new Player(this.gameWidth, this.gameHeight, playerImage);
    this.testEnemy = new Player(this.gameWidth, this.gameHeight, playerImage);

    this.inputHandler = new InputHandler(gameWidth, gameHeight);
    this.keys = this.inputHandler.keys;
    this.mousePos = this.inputHandler.mousePos;

    this.camera = new Camera(this.gameWidth, this.gameHeight);
  }

  update(deltatime: number) {
    this.player.update(deltatime);
    this.player.move(this.keys);
    this.testEnemy.update(deltatime);
    this.camera.watch(this.player.rect);
    this.calculateAngle();
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    this.player.draw(ctx, this.camera.pos);
    this.testEnemy.draw(ctx, this.camera.pos);
  }

  calculateAngle() {
    const x = this.mousePos.x - this.gameWidth / 2;
    const y = this.mousePos.y - this.gameHeight / 2;
    const angle = Math.atan2(y, x);
    this.player.angle = angle;
  }
}

export default Game;
