export interface Position {
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
  midTop?: Position;
  midRight?: Position;
  midBottom?: Position;
  midLeft?: Position;
}

export type RectProperties = [number, number, number, number];

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
