import {
  Rectangle,
  Position,
  VerticesRect,
  RotatedRectangle,
} from './interfaces';

export class RotatedRect implements RotatedRectangle {
  private rect: Rectangle;
  private _vertices: VerticesRect;
  constructor(rect: Rectangle) {
    this.rect = rect;
    this._vertices = {
      topLeft: this.rect.topLeft,
      topRight: this.rect.topRight,
      bottomLeft: this.rect.bottomLeft,
      bottomRight: this.rect.bottomRight,
    };
  }

  updateRect(angle: number) {
    const topLeft = this.calculateNewPoint(this.rect.topLeft, angle);
    const topRight = this.calculateNewPoint(this.rect.topRight, angle);
    const bottomLeft = this.calculateNewPoint(this.rect.bottomLeft, angle);
    const bottomRight = this.calculateNewPoint(this.rect.bottomRight, angle);
    this._vertices = {
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
    };
  }

  private calculateNewPoint(point: Position, angle: number): Position {
    const center = this.rect.center;
    // position center to OG coords 0,0 (easier for rotation)
    // and get new placed x and y coords of current point
    const newPositionedX = point.x - center.x;
    const newPositionedY = point.y - center.y;

    const rotatedOGRelativeX =
      newPositionedX * Math.cos(angle) - newPositionedY * Math.sin(angle);
    const rotatedOGRelativeY =
      newPositionedX * Math.sin(angle) + newPositionedY * Math.cos(angle);

    // position back to original spot...
    const rotatedX = rotatedOGRelativeX + center.x;
    const rotatedY = rotatedOGRelativeY + center.y;

    return { x: rotatedX, y: rotatedY };
  }

  get vertices() {
    return this._vertices;
  }
}
