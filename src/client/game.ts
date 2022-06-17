import Player from './player';
import Enemies from './enemies';
import { Bullet } from './bullet';
import Camera from './camera';
import UI from './ui';
import getBackground from './background';
import { PlayerState, State } from '../shared/stateInterfaces';
import { Position } from './interfaces';
import Images from './assets';

class Game {
  private ctx: CanvasRenderingContext2D;
  private gameWidth: number;
  private gameHeight: number;
  private player: Player;
  private enemies: Enemies;
  private bullet: Bullet;
  private camera: Camera;
  private username: string;
  private ui: UI;
  private backgroundRect: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  private background: HTMLCanvasElement;

  constructor(
    ctx: CanvasRenderingContext2D,
    gameWidth: number,
    gameHeight: number,
    username: string,
    ctxUI: CanvasRenderingContext2D,
    images: Images
  ) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.player = new Player(
      images.playerNormal,
      images.playerDamaged,
      images.bullet
    );
    this.enemies = new Enemies(
      images.playerNormal,
      images.playerDamaged,
      images.bullet
    );
    this.bullet = new Bullet(images.bullet);
    this.camera = new Camera(this.gameWidth, this.gameHeight);
    this.username = username;
    this.ui = new UI(ctxUI);
    this.backgroundRect = {
      x: -5000,
      y: -5000,
      width: 10000,
      height: 10000,
    };
    this.background = getBackground(this.backgroundRect);
  }

  getMe(playerStates: PlayerState[]) {
    const me = playerStates.find((player) => player.username == this.username);
    return me;
  }

  draw(state: State) {
    this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    const backgroundInCameraPos: Position = {
      x: this.backgroundRect.x - this.camera.pos.x,
      y: this.backgroundRect.y - this.camera.pos.y,
    };
    this.ctx.drawImage(
      this.background,
      backgroundInCameraPos.x,
      backgroundInCameraPos.y
    );
    const enemies = state.playerStates;
    const me = this.getMe(state.playerStates);
    if (me) {
      const meIndex = enemies.indexOf(me);
      enemies.splice(meIndex, 1);
      this.camera.watch(me.pos);
      this.player.draw(this.ctx, me, this.camera.pos);
      this.ui.drawCharge(me.charge);
    }
    this.enemies.drawPlayers(this.ctx, enemies, this.camera.pos);
    state.bulletsState.forEach((bulletState) => {
      this.bullet.draw(this.ctx, bulletState, this.camera.pos);
    });
  }
}

export default Game;
