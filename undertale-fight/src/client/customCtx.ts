import { Rect } from '../shared/rectangle';

declare global {
  interface CanvasRenderingContext2D {
    contextRect?: Rect;
    drawInBox: (x: number, y: number, width: number, height: number) => void;
  }
}

CanvasRenderingContext2D.prototype.drawInBox = function (
  x: number,
  y: number,
  width: number,
  height: number
) {
  if (!this.contextRect) return console.error('please provide the contextRect');
  const xPos = x - this.contextRect.x;
  const yPos = y - this.contextRect.y;
  this.fillRect(xPos, yPos, width, height);
};

export {};
