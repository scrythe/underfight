import { NormalBone, LongBone, VeryLongBone } from './bone';
import { BoneState } from '../../shared/stateInterface';
import { BoneMap } from '../../shared/interface';

const boneMap: BoneMap<NormalBone, LongBone, VeryLongBone> = {
  NormalBone: new NormalBone(),
  LongBone: new LongBone(),
  VeryLongBone: new VeryLongBone(),
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
