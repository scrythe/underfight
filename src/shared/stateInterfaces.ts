import { ClientRect, VerticesRect } from '../server/interfaces';

export interface PlayerState {
  rect: ClientRect;
  rotatedRectVertices: VerticesRect;
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
