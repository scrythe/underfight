import { Position } from './interfaces';

export interface ClientRect {
  center: Position;
  width: number;
  height: number;
}

export interface PlayerState {
  rect: ClientRect;
}

export interface BulletState {
  rect: ClientRect;
}

export interface State {
  playerState: PlayerState;
  bulletsState: BulletState[];
  cameraPos: Position;
  angle: number;
}
