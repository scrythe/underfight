import { BoneType, HeartType, Position } from './interface';

export interface PlayerState {
  heartType: HeartType;
  playerPos: Position;
}

export interface BoneState {
  bonePos: Position;
  boneType: BoneType;
}

export interface State {
  playerState: PlayerState;
  boneStates: BoneState[];
}
