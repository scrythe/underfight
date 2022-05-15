import { ClientRect, Edges } from './interfaces';

export interface PlayerState {
  rect: ClientRect;
  rotatedRectPerpendicularVectors: Edges;
  angle: number;
  name: string;
}

export interface BulletState {
  rect: ClientRect;
  angle: number;
}

export interface State {
  playerStates: PlayerState[];
  bulletsState: BulletState[];
}
