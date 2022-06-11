import Player from './Player';
import { PlayerState } from '../shared/stateInterfaces';
import { Position } from './interfaces';

class Enemies extends Player {
  constructor() {
    super();
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
