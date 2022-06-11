import Images from './assets';
import { PlayerState } from '../shared/stateInterfaces';
import { Position } from '../shared/interfaces';
import { rotateAndDrawObject } from './functions';

const images = new Images();

class Rocket {
  private playerImage: HTMLImageElement;
  private width = 50;
  private height = 100;

  constructor() {
    this.playerImage = images.rocket;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    { pos, angle }: PlayerState,
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
      this.playerImage,
      angle
    );
  }
}

export default Rocket;
