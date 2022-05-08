import { Keys, CameraInterface } from './interfaces';
import Player from './player';
import InputHandler from './input';
import Camera from './camera';
class Game {
  private gameWidth: number;
  private gameHeight: number;
  private player: Player;
  private testEnemy: Player;
  private keys: Keys;
  private camera: CameraInterface;

  constructor(gameWidth: number, gameHeight: number) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.player = new Player(this.gameWidth, this.gameHeight);
    this.testEnemy = new Player(this.gameWidth, this.gameHeight);
    this.keys = new InputHandler().keys;
    this.camera = new Camera(this.gameWidth, this.gameHeight);
  }

  update(deltatime: number) {
    this.player.update(deltatime);
    this.player.move(this.keys);
    this.testEnemy.update(deltatime);
    this.camera.watch(this.player.rect);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    this.player.draw(ctx, this.camera.pos);
    this.testEnemy.draw(ctx, this.camera.pos);
  }
}

export default Game;
