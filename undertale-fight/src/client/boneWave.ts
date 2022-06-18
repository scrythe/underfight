import Bone from './bone';
import { BoneState } from '../shared/stateInterface';

class BoneWave {
  private bone: Bone;

  constructor() {
    this.bone = new Bone();
  }

  draw(ctx: CanvasRenderingContext2D, boneStates: BoneState[]) {
    boneStates.forEach((boneState) => {
      this.bone.draw(ctx, boneState);
    });
  }
}

export default BoneWave;
