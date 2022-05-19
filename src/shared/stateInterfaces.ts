import { ClientRect, PlayerPhase } from './interfaces';

export interface PlayerState {
  rect: ClientRect;
  angle: number;
  name: string;
  damaged: boolean;
  charge: number;
  phase: PlayerPhase;
}

export interface BulletState {
  rect: ClientRect;
  angle: number;
}

export interface State {
  playerStates: PlayerState[];
  bulletsState: BulletState[];
}
