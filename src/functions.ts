import { Position, Rectangle } from './interfaces';

export function rotateAndDrawObject(
  ctx: CanvasRenderingContext2D,
  insideCameraPos: Position,
  rect: Rectangle,
  image: HTMLImageElement,
  angle: number
) {
  ctx.save();
  ctx.translate(insideCameraPos.x, insideCameraPos.y);
  ctx.rotate(angle);
  ctx.drawImage(image, -rect.width / 2, -rect.height / 2);
  ctx.restore();
}
