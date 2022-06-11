import { Position } from './interfaces';

export function rotateAndDrawObject(
  ctx: CanvasRenderingContext2D,
  insideCameraPos: Position,
  width: number,
  height: number,
  image: HTMLImageElement,
  angle: number
) {
  ctx.save();
  ctx.translate(insideCameraPos.x, insideCameraPos.y);
  ctx.rotate(angle);
  ctx.drawImage(image, -width / 2, -height / 2);
  ctx.restore();
}
