import { PlayerPhase, Position, playerKillStat } from './interfaces';

export interface PlayerState {
  pos: Position;
  angle: number;
  damaged: boolean;
  charge: number;
  phase: PlayerPhase;
  username: string;
  hp: number;
}

export interface BulletState {
  pos: Position;
  angle: number;
}

export interface State {
  playerStates: PlayerState[];
  bulletsState: BulletState[];
  leaderboard: playerKillStat[];
}
