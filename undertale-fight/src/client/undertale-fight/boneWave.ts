import { NormalBone, LongBone, VeryLongBone } from './bone';
import { BoneState } from '../../shared/undertale-fight/stateInterface';
import { BoneMap } from '../../shared/undertale-fight/interface';

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
