import { Position, Rectangle } from './interfaces';

export function getRadian(angle: number): number {
  return (angle * Math.PI) / 180;
}

export function rotateAndDrawObject(
  ctx: CanvasRenderingContext2D,
  insideCameraPos: Position,
  rect: Rectangle,
  angle: number
) {
  ctx.save();
  ctx.translate(insideCameraPos.x, insideCameraPos.y);
  ctx.rotate(getRadian(angle));
  ctx.fillRect(-rect.width / 2, -rect.height / 2, rect.width, rect.height);
  ctx.restore();
}
