import { HeartType, Position } from './interface';

export interface PlayerState {
  heartType: HeartType;
  playerPos: Position;
}

export interface BoneState {
  bonePos: Position;
}

export interface State {
  playerState: PlayerState;
  boneStates: BoneState[];
}
