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

export interface Screen {
  width: number;
  height: number;
}

type Key = { pressed: boolean };

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

export interface Keys {
  up: Key;
  right: Key;
  down: Key;
  left: Key;
}
