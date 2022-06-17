import Images from './assets';
import { PlayerState } from '../shared/stateInterfaces';
import { Position } from '../shared/interfaces';
import { rotateAndDrawObject } from './functions';
import { ShipConst } from '../shared/gameConstants';

const images = new Images();

class Ship {
  private playerImages: [HTMLImageElement, HTMLImageElement];
  private playerImagesIndex: number;
  private width = ShipConst.width;
  private height = ShipConst.height;

  constructor() {
    const playerImageNormal = images.playerNormal;
    const playerImageDamaged = images.playerDamaged;
    this.playerImages = [playerImageNormal, playerImageDamaged];
    this.playerImagesIndex = 0;
  }

  get playerImage() {
    const playerImage = this.playerImages[this.playerImagesIndex];
    return playerImage ? playerImage : this.playerImages[0];
  }

  draw(
    ctx: CanvasRenderingContext2D,
    { pos, angle, damaged }: PlayerState,
    cameraPos: Position
  ) {
    this.playerImagesIndex = 0;
    if (damaged) this.playerImagesIndex = 1;
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

export default Ship;
