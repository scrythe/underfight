import Player from './player';
import Enemies from './enemies';
import { Bullet } from './bullet';
import Camera from './camera';
import UI from './ui';
import getBackground from './background';
import { PlayerState, State } from '../shared/stateInterfaces';
import { Position } from './interfaces';
import Images from './assets';
import LeaderBoard from './leaderboard';
import RectObject, { Rect } from '../shared/rectangle';

class Game {
  private ctx: CanvasRenderingContext2D;
  private screen: Rect;
  private leaderBoard: LeaderBoard;
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

    const screenObject = new RectObject(gameWidth, gameHeight);
    const screenPos = {
      x: 0,
      y: 0,
    };
    this.screen = screenObject.getRect({ topLeft: screenPos });
    this.leaderBoard = new LeaderBoard(this.screen);

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
    this.camera = new Camera(this.screen.width, this.screen.height);
    this.username = username;
    this.ui = new UI(ctxUI);
    this.backgroundRect = {
      x: -5000,
      y: -5000,
      width: 10000,
      height: 10000,
    };
    this.background = getBackground(this.backgroundRect);
    this.ctx.font = '20px Roboto';
  }

  reloadFont() {
    this.ctx.font = '20px Roboto';
  }

  getMe(playerStates: PlayerState[]) {
    const me = playerStates.find((player) => player.username == this.username);
    return me;
  }

  draw(state: State) {
    this.ctx.clearRect(0, 0, this.screen.width, this.screen.height);
    const backgroundInCameraPos: Position = {
      x: this.backgroundRect.x - this.camera.pos.x,
      y: this.backgroundRect.y - this.camera.pos.y,
    };
    this.ctx.drawImage(
      this.background,
      backgroundInCameraPos.x,
      backgroundInCameraPos.y
    );
    const me = this.getMe(state.playerStates);
    if (!me) return;
    const enemies = state.playerStates.filter(
      (playerState) => playerState.username != me.username
    );

    this.enemies.drawPlayers(this.ctx, enemies, this.camera.pos);
    state.bulletsState.forEach((bulletState) => {
      this.bullet.draw(this.ctx, bulletState, this.camera.pos);
    });

    const meIndex = enemies.indexOf(me);
    enemies.splice(meIndex, 1);
    this.camera.watch(me.pos);
    this.player.draw(this.ctx, me, this.camera.pos);
    this.ui.drawCharge(me.charge);

    this.leaderBoard.draw(this.ctx, state.leaderboard);
  }
}

export default Game;
