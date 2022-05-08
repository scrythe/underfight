import Player from './player';
import InputHandler from './input';
import { Keys } from './interfaces';
class Game {
  private gameWidth: number;
  private gameHeight: number;
  private player: Player;
  private keys: Keys;

  constructor(gameWidth: number, gameHeight: number) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.player = new Player(this.gameWidth, this.gameHeight);
    this.keys = new InputHandler().keys;
  }

  update(deltatime: number) {
    this.player.update(deltatime);
    this.player.move(this.keys);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    this.player.draw(ctx);
  }
}

export default Game;
