import { Position } from '../server/interfaces/interfaces';

export interface ClientRect {
  center: Position;
  width: number;
  height: number;
}

export interface PlayerState {
  rect: ClientRect;
  angle: number;
}

export interface BulletState {
  rect: ClientRect;
  angle: number;
}

export interface State {
  playerState: PlayerState;
  bulletsState: BulletState[];
  cameraPos: Position;
}
