import { Position, PlayerPhase } from './interfaces';
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
  private ui: UI;

  constructor(
    ctx: CanvasRenderingContext2D,
    gameWidth: number,
    gameHeight: number,
    name: string,
    ctxUI: CanvasRenderingContext2D
  ) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.player = new Player(ctx);
    this.enemies = new Enemies(ctx);
    this.bullets = new Bullets(this.ctx);
    this.camera = new Camera(this.gameWidth, this.gameHeight);
    this.name = name;
    this.ui = new UI(ctxUI);
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
      this.player.draw(me, this.camera.pos);
      this.ui.drawCharge(me.charge);
    }
    this.enemies.drawPlayers(enemies, this.camera.pos);
    this.bullets.draw(state.bulletsState, this.camera.pos);
  }
}

class Player {
  private ctx: CanvasRenderingContext2D;
  private playerImages: HTMLImageElement[];
  private playerImagesIndex: number;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    const playerImageNormal = images.playerNormal;
    const playerImageDamaged = images.playerDamaged;
    const playerImageRocket = images.rocket;
    this.playerImages = [
      playerImageNormal,
      playerImageDamaged,
      playerImageRocket,
    ];
    this.playerImagesIndex = 0;
  }

  get playerImage(): HTMLImageElement {
    return this.playerImages[this.playerImagesIndex];
  }

  draw({ rect, angle, damaged, phase }: PlayerState, cameraPos: Position) {
    this.playerImagesIndex = 0;
    if (damaged) this.playerImagesIndex = 1;
    if (phase == PlayerPhase.Rocket) this.playerImagesIndex = 2;
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

class Enemies extends Player {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }
  drawPlayers(playerStates: PlayerState[], cameraPos: Position) {
    playerStates.forEach((player) => {
      super.draw(player, cameraPos);
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

class UI {
  private ctx: CanvasRenderingContext2D;
  private MAX_WIDTH = 200;
  private CHARGE_WIDTH_PER = this.MAX_WIDTH / 10;
  private HEIGHT = 50;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.ctx.fillStyle = 'yellow';
  }
  getChargeWidth(charge: number) {
    return charge * this.CHARGE_WIDTH_PER;
  }
  drawCharge(charge: number) {
    this.ctx.fillRect(0, 0, this.getChargeWidth(charge), this.HEIGHT);
  }
}

export default DrawGame;
