import RectObject, { Rect } from '../shared/rectangle';
import { playerKillStat } from './interfaces';

class LeaderBoard {
  private rect: Rect;
  private fontHeight = 20;
  private startY: number;
  private fontX: number;

  constructor(screen: Rect) {
    const rectWidth = 11 * this.fontHeight + 10;
    const rectObject = new RectObject(200, rectWidth);
    this.rect = rectObject.getRect({ topRight: screen.topRight });
    this.rect.x -= 10;
    this.rect.y += 10;

    this.startY = this.rect.top + this.fontHeight + 10;
    this.fontX = this.rect.left + 10;
  }

  draw(ctx: CanvasRenderingContext2D, leaderboard: playerKillStat[]) {
    ctx.fillStyle = 'gray';
    ctx.fillRect(...this.rect.getRectProperties());
    ctx.fillStyle = 'white';

    let currentY = this.startY;

    leaderboard.forEach((playerStat) => {
      const username = playerStat.username;
      const kills = playerStat.kills;
      ctx.textAlign = 'left';
      ctx.fillText(`${username}: ${kills}`, this.fontX, currentY);
      currentY += this.fontHeight;
    });
  }
}

export default LeaderBoard;
