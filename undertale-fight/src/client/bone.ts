import { BoneState } from '../shared/stateInterface';
import {
  AbstractBoneConst,
  NormalBoneConst,
  LongBoneConst,
  VeryLongBoneConst,
} from '../shared/gameConstants';

class AbstractBone {
  protected width: number;
  protected height: number;

  constructor(height: number) {
    this.width = AbstractBoneConst.width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D, boneState: BoneState) {
    ctx.fillStyle = 'gray';
    const bonePos = boneState.bonePos;
    ctx.drawInBox(bonePos.x, bonePos.y, this.width, this.height);
  }
}

export class NormalBone extends AbstractBone {
  constructor() {
    const height = NormalBoneConst.height;
    super(height);
  }
}

export class LongBone extends AbstractBone {
  constructor() {
    const height = LongBoneConst.height;
    super(height);
  }
}

export class VeryLongBone extends AbstractBone {
  constructor() {
    const height = VeryLongBoneConst.height;
    super(height);
  }
}
