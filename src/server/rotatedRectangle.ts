import {
  Rectangle,
  Position,
  VerticesRect,
  RotatedRectangle,
  Edges,
} from './interfaces';
import { getVector } from './utils';

class RotatedRect implements RotatedRectangle {
  private rect: Rectangle;
  private angle: number;
  private _vertices: VerticesRect | undefined;
  private _edges: Edges | undefined;
  private _perpendicularVectors: Edges | undefined;
  constructor(rect: Rectangle, angle: number) {
    this.rect = rect;
    this.angle = angle;
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

  private calculateVertices() {
    const topRight = this.calculaterotatedPoint(
      this.rect.topRight,
      this.rect.center,
      this.angle
    );
    const bottomRight = this.calculaterotatedPoint(
      this.rect.bottomRight,
      this.rect.center,
      this.angle
    );
    const bottomLeft = this.calculaterotatedPoint(
      this.rect.bottomLeft,
      this.rect.center,
      this.angle
    );
    const topLeft = this.calculaterotatedPoint(
      this.rect.topLeft,
      this.rect.center,
      this.angle
    );
    this._vertices = {
      topRight,
      bottomRight,
      bottomLeft,
      topLeft,
    };
  }

  private calculateEdges(vertices: VerticesRect) {
    const right = getVector(vertices.topRight, vertices.bottomRight);
    const bottom = getVector(vertices.bottomRight, vertices.bottomLeft);
    const left = getVector(vertices.bottomLeft, vertices.topLeft);
    const top = getVector(vertices.topLeft, vertices.topRight);
    this._edges = {
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
    this._perpendicularVectors = { right, bottom, left, top };
  }

  get vertices(): VerticesRect {
    if (!this._vertices) this.calculateVertices();
    return this._vertices!;
  }

  get edges(): Edges {
    if (!this._edges) this.calculateEdges(this.vertices);
    return this._edges!;
  }

  get perpendicularVectors(): Edges {
    if (!this._perpendicularVectors)
      this.calculatePerpendicularVectors(this.edges);
    return this._perpendicularVectors!;
  }
}

export default RotatedRect;
