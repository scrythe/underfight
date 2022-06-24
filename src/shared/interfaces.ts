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

export interface playerKillStat {
  username: string;
  kills: number;
}

export enum PlayerPhase {
  Ship,
  Rocket,
}

export interface User {
  userID: number;
  username: string;
  email: string;
  password: string;
  tokenID: number;
  created_at: string;
}

export type RegisterApiResponses =
  | 'empty-input'
  | 'pwd-not-match'
  | 'name-or-email-exists'
  | 'stmt-error'
  | 'create-success';

export type LoginApiResponses =
  | 'empty-input'
  | 'user-not-exists'
  | 'password-wrong'
  | string;

export type AuthTokenApiResponses =
  | 'empty-token'
  | 'not-hex-tokens'
  | 'invalid-token'
  | User;
