import { Position } from '../shared/interfaces';

export interface Speed {
  x: number;
  y: number;
}

export interface Screen {
  width: number;
  height: number;
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
