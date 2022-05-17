import { ClientRect, Corners } from './interfaces';

export interface PlayerState {
  rect: ClientRect;
  angle: number;
  name: string;
  damaged: boolean;
}

export interface BulletState {
  rect: ClientRect;
  angle: number;
}

export interface State {
  playerStates: PlayerState[];
  bulletsState: BulletState[];
}
