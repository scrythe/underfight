import { BoneState } from '../shared/stateInterface';

class Bone {
  protected WIDTH = 10;
  protected HEIGHT = 50;

  draw(ctx: CanvasRenderingContext2D, boneState: BoneState) {
    ctx.fillStyle = 'gray';
    const bonePos = boneState.bonePos;
    ctx.drawInBox(bonePos.x, bonePos.y, this.WIDTH, this.HEIGHT);
  }
}

export class LongBone extends Bone {
  protected override WIDTH = 10;
  protected override HEIGHT = 100;
}

export default Bone;
