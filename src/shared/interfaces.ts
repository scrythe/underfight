export interface Position {
  x: number;
  y: number;
}

export interface ClientRect {
  center: Position;
  width: number;
  height: number;
}

export type Key = { pressed: boolean };

export interface Keys {
  up: Key;
  right: Key;
  down: Key;
  left: Key;
  fire: Key;
}
