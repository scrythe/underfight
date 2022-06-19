import { LongBone } from './bone';
import { BoneState } from '../shared/stateInterface';

class BoneWave {
  private bone: LongBone;

  constructor() {
    this.bone = new LongBone();
  }

  draw(ctx: CanvasRenderingContext2D, boneStates: BoneState[]) {
    boneStates.forEach((boneState) => {
      this.bone.draw(ctx, boneState);
    });
  }
}

export default BoneWave;
