import Images from './assets';
import { BulletState } from '../shared/stateInterfaces';
import { Position } from './interfaces';
import { rotateAndDrawObject } from './functions';

const images = new Images();

class Bullet {
  private bulletImage: HTMLImageElement;
  private width = 50;
  private height = 10;

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

export default Bullet;
