import { Position, Rectangle } from '../shared/interfaces';

export interface Speed {
  x: number;
  y: number;
}

export interface Screen {
  width: number;
  height: number;
}

export interface RectPosition {
  x?: number;
  y?: number;

  top?: number;
  right?: number;
  bottom?: number;
  left?: number;

  topLeft?: Position;
  topRight?: Position;
  bottomLeft?: Position;
  bottomRight?: Position;

  center?: Position;
}

export interface RectanlgeObject {
  getRect(rectPos: RectPosition): Rectangle;
}

export interface CameraInterface {
  pos: Position;
  watch(target: Rectangle): void;
}

export interface DotMinMax {
  min: number;
  max: number;
}

export interface Corners {
  topLeft: Position;
  topRight: Position;
  bottomRight: Position;
  bottomLeft: Position;
}

export interface Vector {
  x: number;
  y: number;
}
export interface Edges {
  right: Vector;
  bottom: Vector;
  left: Vector;
  top: Vector;
}

export interface VerticesRect {
  topRight: Position;
  bottomRight: Position;
  bottomLeft: Position;
  topLeft: Position;
}

export interface RotatedRectangle {
  vertices: VerticesRect;
  edges: Edges;
  perpendicularVectors: Edges;
  hitBox: Corners;
}

export * from '../shared/interfaces';
