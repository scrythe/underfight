export interface Position {
  x: number;
  y: number;
}

export interface Speed {
  x: number;
  y: number;
}

export type Key = { pressed: boolean };

export interface Keys {
  up: Key;
  right: Key;
  down: Key;
  left: Key;
  fire: Key;
}

export interface Screen {
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
