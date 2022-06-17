import Images from './assets';
import { BulletState } from '../shared/stateInterfaces';
import { Position } from './interfaces';
import { rotateAndDrawObject } from './functions';
import { AbractBulletConst } from '../shared/gameConstants';

const images = new Images();

class AbstractBullet {
  private bulletImage: HTMLImageElement;
  private width = AbractBulletConst.width;
  private height = AbractBulletConst.height;

  constructor() {
    this.bulletImage = images.bullet;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    { pos, angle }: BulletState,
    cameraPos: Position
  ) {
    const insideCameraPos: Position = {
      x: pos.x - cameraPos.x,
      y: pos.y - cameraPos.y,
    };
    rotateAndDrawObject(
      ctx,
      insideCameraPos,
      this.width,
      this.height,
      this.bulletImage,
      angle
    );
  }
}

export class Bullet extends AbstractBullet {}

export class Rocket extends AbstractBullet {}
