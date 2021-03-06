import RectObject, { Rect } from '../../shared/undertale-fight/rectangle';
import Player from './player';
import FightBox from './fightBox';
import BoneWave from './boneWave';
import { State } from '../../shared/undertale-fight/stateInterface';
import InputHandler from './inputs';
import './customCtx';
import { ClientInterface } from '../../shared/undertale-fight/serverInterface';
import { GameConst } from '../../shared/undertale-fight/gameConstants';

class Game {
  private ctx: CanvasRenderingContext2D;
  private screen: Rect;
  private fightBox: FightBox;
  private player: Player;
  private bonesWave: BoneWave;
  private WIDTH = GameConst.width;
  private HEIGHT = GameConst.height;

  constructor(canvas: HTMLCanvasElement, socket: ClientInterface) {
    canvas.width = this.WIDTH;
    canvas.height = this.HEIGHT;
    this.ctx = canvas.getContext('2d')!;

    const screenObject = new RectObject(this.WIDTH, this.HEIGHT);
    const screenPos = {
      x: 0,
      y: 0,
    };

    this.screen = screenObject.getRect({ topLeft: screenPos });
    new InputHandler(socket, canvas);
    this.fightBox = new FightBox(this.screen);
    this.player = new Player();
    this.bonesWave = new BoneWave();
  }

  draw(state: State) {
    this.ctx.clearRect(0, 0, this.screen.width, this.screen.height);
    this.fightBox.draw(this.ctx);
    this.player.draw(this.ctx, state.playerState);
    this.bonesWave.draw(this.fightBox.ctxBox, state.boneStates);
    this.fightBox.drawBoxToScreen(this.ctx);
  }
}

export default Game;
