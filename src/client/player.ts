import { PlayerState } from '../shared/stateInterfaces';
import { Position } from '../shared/interfaces';
import { PlayerPhase } from '../shared/interfaces';
import Ship from './ship';
import { Rocket } from './bullet';
import { ShipConst } from '../shared/gameConstants';

class Player {
  private ship: Ship;
  private rocket: Rocket;
  private maxHeatlh = ShipConst.maxHealth;

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
    this.drawHpBar(ctx, playerState, cameraPos);
  }

  drawHpBar(
    ctx: CanvasRenderingContext2D,
    { pos, hp }: PlayerState,
    cameraPos: Position
  ) {
    const insideCameraPos: Position = {
      x: pos.x - cameraPos.x,
      y: pos.y - cameraPos.y,
    };

    if (hp >= this.maxHeatlh) return;

    const healthPercentage = hp / this.maxHeatlh;
    const maxWidth = ShipConst.width;
    const width = ShipConst.width * healthPercentage;
    const height = ShipConst.height / 8;

    const x = insideCameraPos.x - maxWidth / 2;
    const y = insideCameraPos.y + ShipConst.height / 2 + height;

    ctx.fillStyle = 'black';
    ctx.fillRect(x, y, maxWidth, height);

    ctx.fillStyle = 'green';
    ctx.fillRect(x, y, width, height);
  }
}

export default Player;
