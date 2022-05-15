import {
  Rectangle,
  Position,
  Vertices,
  Edges,
  PolygonType,
} from './interfaces';
import { getVector } from './utils';

class RotatedRectangle {
  private rect: Rectangle;
  private angle: number;
  constructor(rect: Rectangle, angle: number) {
    this.rect = rect;
    this.angle = angle;
  }

  private calculateNewPoint(point: Position): Position {
    const center = this.rect.center;
    const distanceX = point.x - center.x;
    const distanceY = point.y - center.y;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    const originalAngle = Math.atan2(distanceY, distanceX);

    const rotatedX = center.x + distance * Math.cos(originalAngle + this.angle);
    const rotatedY = center.y + distance * Math.cos(originalAngle + this.angle);

    return { x: rotatedX, y: rotatedY };
  }

  get topLeft() {
    return this.calculateNewPoint(this.rect.topLeft);
  }

  get topRight() {
    return this.calculateNewPoint(this.rect.topRight);
  }

  get bottomLeft() {
    return this.calculateNewPoint(this.rect.bottomLeft);
  }

  get bottomRight() {
    return this.calculateNewPoint(this.rect.bottomRight);
  }
}

export default class Polygon implements PolygonType {
  private _vertices: Vertices;
  private _edges: Edges;
  constructor(rect: Rectangle, angle: number) {
    const rotatedRectangle = new RotatedRectangle(rect, angle);

    this._vertices = [
      rotatedRectangle.topRight,
      rotatedRectangle.bottomRight,
      rotatedRectangle.bottomLeft,
      rotatedRectangle.topLeft,
    ];

    this._edges = [
      getVector(rotatedRectangle.topRight, rotatedRectangle.bottomRight),
      getVector(rotatedRectangle.bottomRight, rotatedRectangle.bottomLeft),
      getVector(rotatedRectangle.bottomLeft, rotatedRectangle.topLeft),
      getVector(rotatedRectangle.topLeft, rotatedRectangle.topRight),
    ];
  }

  get vertices() {
    return this._vertices;
  }

  get edges() {
    return this._edges;
  }
}
