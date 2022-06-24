import { Position } from '../../shared/undertale-fight/interface';
import { HeartConst } from '../../shared/undertale-fight/gameConstants';

class Heart {
  private WIDTH = HeartConst.width;
  private HEIGHT = HeartConst.height;

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
