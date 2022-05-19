export interface Position {
  x: number;
  y: number;
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
  chargeAttack: Key;
}

export enum PlayerPhase {
  Ship,
  Rocket,
}
