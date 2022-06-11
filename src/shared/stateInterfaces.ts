import { PlayerPhase, Position } from './interfaces';

export interface PlayerState {
  pos: Position;
  angle: number;
  name: string;
  damaged: boolean;
  charge: number;
  phase: PlayerPhase;
}

export interface BulletState {
  pos: Position;
  angle: number;
}

export interface State {
  playerStates: PlayerState[];
  bulletsState: BulletState[];
}
