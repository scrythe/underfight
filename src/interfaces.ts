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

export type Speed = Position;

type Key = { pressed: boolean };

export interface Keys {
  up: Key;
  right: Key;
  down: Key;
  left: Key;
}
