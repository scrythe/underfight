// namespace Types {
//   export interface Pos {
//     x: number;
//     y: number;
//   }

//   export interface Player {
//     draw(ctx: CanvasRenderingContext2D): void;
//   }
// }

// export default Types;

export interface Position {
  x: number;
  y: number;
}

export interface Speed {
  x: number;
  y: number;
}

export interface Keys {
  up: Key;
  right: Key;
  down: Key;
  left: Key;
  fire: Key;
}

export interface KeyMap {
  ArrowUp: keyof Keys;
  ArrowRight: keyof Keys;
  ArrowDown: keyof Keys;
  ArrowLeft: keyof Keys;

  w: keyof Keys;
  d: keyof Keys;
  s: keyof Keys;
  a: keyof Keys;

  ' ': keyof Keys;
}

export interface Screen {
  width: number;
  height: number;
}

export type Key = { pressed: boolean };

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

export interface clientRect {
  center: Position;
  width: number;
  height: number;
}

export interface RectanlgeObject {
  getRect(rectPos: RectPosition): Rectangle;
}

export interface CameraInterface {
  pos: Position;
  watch(target: Rectangle): void;
}

export interface PlayerState {
  rect: clientRect;
}

export interface BulletState {
  rect: clientRect;
}

export interface State {
  playerState: PlayerState;
  bulletsState: BulletState[];
  cameraPos: Position;
  angle: number;
}
