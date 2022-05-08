import Player from './player';

class Game {
  private gameWidth: number;
  private gameHeight: number;
  private player: Player;

  constructor(gameWidth: number, gameHeight: number) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.player = new Player(this.gameWidth, this.gameHeight);
  }

  update(deltatime: number) {
    this.player.update(deltatime);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    this.player.draw(ctx);
  }
}

export default Game;
