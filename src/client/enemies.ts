import Player from './player';
import { PlayerState } from '../shared/stateInterfaces';
import { Position } from './interfaces';

class Enemies extends Player {
  constructor(
    playerImageNormal: HTMLImageElement,
    playerImageDamaged: HTMLImageElement,
    bulletImage: HTMLImageElement
  ) {
    super(playerImageNormal, playerImageDamaged, bulletImage);
  }
  drawPlayers(
    ctx: CanvasRenderingContext2D,
    playerStates: PlayerState[],
    cameraPos: Position
  ) {
    playerStates.forEach((player) => {
      super.draw(ctx, player, cameraPos);
    });
  }
}

export default Enemies;
