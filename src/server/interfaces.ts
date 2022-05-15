import { Position, Rectangle } from '../shared/interfaces';

export interface Speed {
  x: number;
  y: number;
}

export interface Screen {
  width: number;
  height: number;
}

export interface Vector {
  x: number;
  y: number;
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

export type Vertices = Position[];

export type Edges = Vector[];

export interface PolygonType {
  vertices: Vertices;
  edges: Edges;
}

export interface RectanlgeObject {
  getRect(rectPos: RectPosition): Rectangle;
}

export interface CameraInterface {
  pos: Position;
  watch(target: Rectangle): void;
}

export * from '../shared/interfaces';
