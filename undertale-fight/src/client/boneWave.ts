import { NormalBone, LongBone } from './bone';
import { BoneState } from '../shared/stateInterface';
import { BoneMap } from '../shared/interface';

const boneMap: BoneMap<NormalBone, LongBone> = {
  NormalBone: new NormalBone(),
  LongBone: new LongBone(),
};

class BoneWave {
  draw(ctx: CanvasRenderingContext2D, boneStates: BoneState[]) {
    boneStates.forEach((boneState) => {
      const bone = boneMap[boneState.boneType];
      bone.draw(ctx, boneState);
    });
  }
}

export default BoneWave;
