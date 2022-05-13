import { Position } from './interfaces';
import { State, PlayerState, BulletState } from '../shared/stateInterfaces';
import { rotateAndDrawObject } from './functions';
import Camera from './camera';
import Images from './assets';

const images = new Images();

class DrawGame {
  private ctx: CanvasRenderingContext2D;
  private gameWidth: number;
  private gameHeight: number;
  private player: Player;
  private bullets: Bullets;
  private camera: Camera;

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
    this.camera = new Camera(this.gameWidth, this.gameHeight);
  }

  draw(state: State) {
    this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    this.camera.watch(state.playerState.rect);
    this.player.draw(state.playerState, this.camera.pos);
    this.bullets.draw(state.bulletsState, this.camera.pos);
  }
}

class Player {
  private ctx: CanvasRenderingContext2D;
  private playerImage: HTMLImageElement;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.playerImage = images.player;
  }

  draw({ rect, angle }: PlayerState, cameraPos: Position) {
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
    this.bulletImage = images.bullet;
  }

  draw(bulletsState: BulletState[], cameraPos: Position) {
    bulletsState.forEach((bulletState) => {
      this.drawBullet(bulletState, cameraPos);
    });
  }

  drawBullet({ rect, angle }: BulletState, cameraPos: Position) {
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
