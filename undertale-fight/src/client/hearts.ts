import { Position } from '../shared/interface';

class Heart {
  private WIDTH = 16;
  private HEIGHT = 16;

  protected draw(ctx: CanvasRenderingContext2D, playerPos: Position) {
    ctx.fillRect(playerPos.x, playerPos.y, this.WIDTH, this.HEIGHT);
  }
}

export class RedHeart extends Heart {
  override draw(ctx: CanvasRenderingContext2D, playerPos: Position) {
    ctx.fillStyle = 'red';
    super.draw(ctx, playerPos);
  }
}

export class BlueHeart extends Heart {
  override draw(ctx: CanvasRenderingContext2D, playerPos: Position) {
    ctx.fillStyle = 'blue';
    super.draw(ctx, playerPos);
  }
}
