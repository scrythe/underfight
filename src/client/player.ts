import { PlayerState } from '../shared/stateInterfaces';
import { Position } from '../shared/interfaces';
import { PlayerPhase } from '../shared/interfaces';
import Ship from './ship';
import { Rocket } from './bullet';

class Player {
  private ship: Ship;
  private rocket: Rocket;

  constructor(
    playerImageNormal: HTMLImageElement,
    playerImageDamaged: HTMLImageElement,
    bulletImage: HTMLImageElement
  ) {
    this.ship = new Ship(playerImageNormal, playerImageDamaged);
    this.rocket = new Rocket(bulletImage);
  }

  draw(
    ctx: CanvasRenderingContext2D,
    playerState: PlayerState,
    cameraPos: Position
  ) {
    const phase = playerState.phase;
    const player = phase == PlayerPhase.Rocket ? this.rocket : this.ship;

    player.draw(ctx, playerState, cameraPos);
  }
}

export default Player;
