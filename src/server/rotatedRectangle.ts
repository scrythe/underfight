import {
  Rectangle,
  Position,
  VerticesRect,
  RotatedRectangle,
  Edges,
} from './interfaces';
import { getVector } from './utils';

class getRotatedRect implements RotatedRectangle {
  private _vertices: VerticesRect;
  private _edges: Edges;
  private _perpendicularVectors: Edges;
  constructor(rect: Rectangle, angle: number) {
    this._vertices = this.calculatePoints(rect, angle);
    this._edges = this.calculateEdges(this._vertices);
    this._perpendicularVectors = this.calculatePerpendicularVectors(
      this._edges
    );
  }

  private calculatePoints(rect: Rectangle, angle: number) {
    const topRight = this.calculaterotatedPoint(
      rect.topRight,
      rect.center,
      angle
    );
    const bottomRight = this.calculaterotatedPoint(
      rect.bottomRight,
      rect.center,
      angle
    );
    const bottomLeft = this.calculaterotatedPoint(
      rect.bottomLeft,
      rect.center,
      angle
    );
    const topLeft = this.calculaterotatedPoint(
      rect.topLeft,
      rect.center,
      angle
    );
    return {
      topRight,
      bottomRight,
      bottomLeft,
      topLeft,
    };
  }

  private calculaterotatedPoint(
    point: Position,
    center: Position,
    angle: number
  ): Position {
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

  private calculateEdges(vertices: VerticesRect) {
    const right = getVector(vertices.topRight, vertices.bottomRight);
    const bottom = getVector(vertices.bottomRight, vertices.bottomLeft);
    const left = getVector(vertices.bottomLeft, vertices.topLeft);
    const top = getVector(vertices.topLeft, vertices.topRight);
    return {
      right,
      bottom,
      left,
      top,
    };
  }

  private calculatePerpendicularVectors(edges: Edges) {
    const right = { x: -edges.right.y, y: edges.right.x };
    const bottom = { x: -edges.bottom.y, y: edges.bottom.x };
    const left = { x: -edges.left.y, y: edges.left.x };
    const top = { x: -edges.top.y, y: edges.top.x };
    return { right, bottom, left, top };
  }

  get vertices() {
    return this._vertices;
  }

  get edges() {
    return this._edges;
  }

  get perpendicularVectors() {
    return this._perpendicularVectors;
  }
}

export default getRotatedRect;
