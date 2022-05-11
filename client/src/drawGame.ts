import { Position } from './interfaces/interfaces';
import { State, PlayerState, BulletState } from './interfaces/stateInterfaces';
import { rotateAndDrawObject } from './functions';

class DrawGame {
  private ctx: CanvasRenderingContext2D;
  private gameWidth: number;
  private gameHeight: number;
  private player: Player;
  private bullets: Bullets;

  constructor(
    ctx: CanvasRenderingContext2D,
    gameWidth: number,
    gameHeight: number
  ) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.player = new Player(ctx);
    this.bullets = new Bullets(this.ctx);
  }

  draw(state: State) {
    this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    this.player.draw(state.playerState, state.angle, state.cameraPos);
    this.bullets.draw(state.bulletsState, state.angle, state.cameraPos);
  }
}

class Player {
  private ctx: CanvasRenderingContext2D;
  private playerImage: HTMLImageElement;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.playerImage = document.querySelector('#player-image')!;
  }

  draw({ rect }: PlayerState, angle: number, cameraPos: Position) {
    const insideCameraPos: Position = {
      x: rect.center.x - cameraPos.x,
      y: rect.center.y - cameraPos.y,
    };
    rotateAndDrawObject(
      this.ctx,
      insideCameraPos,
      rect,
      this.playerImage,
      angle
    );
  }
}

class Bullets {
  private ctx: CanvasRenderingContext2D;
  private bulletImage: HTMLImageElement;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.bulletImage = document.querySelector('#bullet-image')!;
  }

  draw(bulletsState: BulletState[], angle: number, cameraPos: Position) {
    bulletsState.forEach((bulletState) => {
      this.drawBullet(bulletState, angle, cameraPos);
    });
  }

  drawBullet({ rect }: BulletState, angle: number, cameraPos: Position) {
    const insideCameraPos: Position = {
      x: rect.center.x - cameraPos.x,
      y: rect.center.y - cameraPos.y,
    };
    rotateAndDrawObject(
      this.ctx,
      insideCameraPos,
      rect,
      this.bulletImage,
      angle
    );
  }
}

export default DrawGame;
