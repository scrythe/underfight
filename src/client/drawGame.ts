import { Position, Edges, Vector, ClientRect } from './interfaces';
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
  private enemies: Enemies;
  private bullets: Bullets;
  private camera: Camera;
  private name: string;

  constructor(
    ctx: CanvasRenderingContext2D,
    gameWidth: number,
    gameHeight: number,
    name: string
  ) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.player = new Player(ctx);
    this.enemies = new Enemies(ctx);
    this.bullets = new Bullets(this.ctx);
    this.camera = new Camera(this.gameWidth, this.gameHeight);
    this.name = name;
  }

  getMe(playerStates: PlayerState[]) {
    const me = playerStates.find((player) => player.name == this.name);
    return me;
  }

  draw(state: State) {
    this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    const enemies = state.playerStates;
    const me = this.getMe(state.playerStates);
    if (me) {
      const meIndex = enemies.indexOf(me);
      enemies.splice(meIndex, 1);
      this.camera.watch(me.rect);
      this.player.draw(me, this.camera.pos, state.collision);
    }
    this.enemies.drawPlayers(enemies, this.camera.pos);
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

  draw(
    { rect, angle, rotatedRectPerpendicularVectors }: PlayerState,
    cameraPos: Position,
    collision: boolean
  ) {
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
    if (collision) {
      this.drawVectors(rect, rotatedRectPerpendicularVectors, cameraPos);
    }
  }

  drawVectors(
    rect: ClientRect,
    rotatedRectPerpendicularVectors: Edges,
    cameraPos: Position
  ) {
    const vectors: Vector[] = Object.values(rotatedRectPerpendicularVectors);
    vectors.forEach((vector) => {
      const insideCameraPosA: Position = {
        x: rect.center.x - cameraPos.x,
        y: rect.center.y - cameraPos.y,
      };
      const insideCameraPosB: Position = {
        x: rect.center.x + vector.x - cameraPos.x,
        y: rect.center.y + vector.y - cameraPos.y,
      };
      this.ctx.beginPath();
      this.ctx.moveTo(insideCameraPosA.x, insideCameraPosA.y);
      this.ctx.lineTo(insideCameraPosB.x, insideCameraPosB.y);
      this.ctx.stroke();
    });
  }
}

class Enemies extends Player {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }
  drawPlayers(playerStates: PlayerState[], cameraPos: Position) {
    playerStates.forEach((player) => {
      super.draw(player, cameraPos, false);
    });
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
