import { BoneState } from '../shared/stateInterface';

class Bone {
  private WIDTH = 10;
  private HEIGHT = 50;

  draw(ctx: CanvasRenderingContext2D, boneState: BoneState) {
    ctx.fillStyle = 'gray';
    const bonePos = boneState.bonePos;
    ctx.drawInBox(bonePos.x, bonePos.y, this.WIDTH, this.HEIGHT);
  }
}

export default Bone;
