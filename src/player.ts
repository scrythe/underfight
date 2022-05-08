import { Position } from './interfaces';

class Player {
  private width: number;
  private height: number;
  private pos: Position;
  private speed: number;

  constructor(gameWidth: number, gameHeight: number) {
    this.width = 150;
    this.height = 150;
    this.pos = {
      x: gameWidth / 2 - this.width / 2,
      y: gameHeight / 2 - this.height / 2,
    };
    this.speed = 25;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  update(deltatime: number) {
    this.pos.x += this.speed / deltatime;
  }
}

export default Player;
