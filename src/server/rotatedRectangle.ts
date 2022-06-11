import {
  Position,
  VerticesRect,
  RotatedRectangle,
  Edges,
  Corners,
} from './interfaces';
import { getVector } from './utils';
import { Rect } from '../shared/rectangle';

class RotatedRect implements RotatedRectangle {
  private rect: Rect;
  private angle: number;
  private _vertices: VerticesRect | undefined;
  private _edges: Edges | undefined;
  private _perpendicularVectors: Edges | undefined;
  private _hitBox: Corners | undefined;
  constructor(rect: Rect, angle: number) {
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

  private calculateHitBox(vertices: VerticesRect) {
    const corners = Object.values(vertices);
    const xCoords = corners.map((corner) => corner.x);
    const yCoords = corners.map((corner) => corner.y);

    const xMax = Math.max(...xCoords);
    const xMin = Math.min(...xCoords);
    const yMax = Math.max(...yCoords);
    const yMin = Math.min(...yCoords);

    const topLeft = { x: xMin, y: yMin };
    const topRight = { x: xMax, y: yMin };
    const bottomRight = { x: xMax, y: yMax };
    const bottomLeft = { x: xMin, y: yMax };

    this._hitBox = { topLeft, topRight, bottomRight, bottomLeft };
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

  get hitBox(): Corners {
    if (!this._hitBox) this.calculateHitBox(this.vertices);
    return this._hitBox!;
  }
}

export default RotatedRect;
