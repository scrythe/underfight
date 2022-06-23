import { BoneState } from '../shared/stateInterface';

class AbstractBone {
  protected width: number;
  protected height: number;

  constructor(width: number, height: number) {
    this.width = width;
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
    const width = 10;
    const height = 50;
    super(width, height);
  }
}

export class LongBone extends AbstractBone {
  constructor() {
    const width = 10;
    const height = 100;
    super(width, height);
  }
}

export class VeryLongBone extends AbstractBone {
  constructor() {
    const width = 10;
    const height = 150;
    super(width, height);
  }
}
