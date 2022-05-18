import { ClientRect } from './interfaces';

export interface PlayerState {
  rect: ClientRect;
  angle: number;
  name: string;
  damaged: boolean;
  charge: number;
}

export interface BulletState {
  rect: ClientRect;
  angle: number;
}

export interface State {
  playerStates: PlayerState[];
  bulletsState: BulletState[];
}
