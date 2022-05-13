import { ClientRect } from '../server/interfaces';

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
}
