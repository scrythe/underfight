export interface Position {
  x: number;
  y: number;
}

export interface ClientRect {
  center: Position;
  width: number;
  height: number;
}

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;

  top: number;
  right: number;
  bottom: number;
  left: number;

  topLeft: Position;
  topRight: Position;
  bottomLeft: Position;
  bottomRight: Position;

  center: Position;
}

export interface InputHandlerType {
  keys: Keys;
  fire: Key;
  updateKeys: (keys: Keys) => void;
}
export interface BulletType {
  rect: Rectangle;
  angle: number;
  update: () => void;
}

export interface PlayerType {
  rect: Rectangle;
  angle: number;
  name: string;
  bullets: BulletType[];
  inputHandler: InputHandlerType;
  update: () => void;
  move: () => void;
  shootBullet: () => void;
}

export interface VerticesRect {
  topRight: Position;
  bottomRight: Position;
  bottomLeft: Position;
  topLeft: Position;
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

export interface RotatedRectangle {
  vertices: VerticesRect;
  edges: Edges;
  perpendicularVectors: Edges;
}

export type Players = PlayerType[];

export type Key = { pressed: boolean };

export interface Keys {
  up: Key;
  right: Key;
  down: Key;
  left: Key;
  fire: Key;
}
