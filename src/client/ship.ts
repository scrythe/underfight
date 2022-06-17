import { PlayerState } from '../shared/stateInterfaces';
import { Position } from '../shared/interfaces';
import { rotateAndDrawObject } from './functions';
import { ShipConst } from '../shared/gameConstants';

class Ship {
  private playerImages: [HTMLImageElement, HTMLImageElement];
  private playerImagesIndex: number;
  private width = ShipConst.width;
  private height = ShipConst.height;

  constructor(
    playerImageNormal: HTMLImageElement,
    playerImageDamaged: HTMLImageElement
  ) {
    this.playerImages = [playerImageNormal, playerImageDamaged];
    this.playerImagesIndex = 0;
  }

  get playerImage() {
    const playerImage = this.playerImages[this.playerImagesIndex];
    return playerImage ? playerImage : this.playerImages[0];
  }

  draw(
    ctx: CanvasRenderingContext2D,
    { pos, angle, damaged, username }: PlayerState,
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

    const textPos = {
      x: insideCameraPos.x,
      y: insideCameraPos.y - ShipConst.height / 1.5,
    };

    ctx.fillStyle = 'black';
    ctx.lineWidth = 3;
    ctx.strokeText(username, textPos.x, textPos.y);
    ctx.fillStyle = 'white';
    ctx.fillText(username, textPos.x, textPos.y);
  }
}

export default Ship;
