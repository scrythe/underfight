import RectObject, { Rect } from '../shared/rectangle';
import { FightBoxType } from '../shared/interface';

class FightBox {
  private fightBox: FightBoxType<Rect>;
  private canvasBox: HTMLCanvasElement;
  private _ctxBox: CanvasRenderingContext2D;

  constructor(screen: Rect) {
    const outerFightBoxObject = new RectObject(250, 250);
    const outerfightBox = outerFightBoxObject.getRect({
      midTop: screen.center,
    });

    const innerFightBoxObject = new RectObject(225, 225);
    const innerFightBox = innerFightBoxObject.getRect({
      center: outerfightBox.center,
    });

    this.fightBox = {
      inner: innerFightBox,
      outer: outerfightBox,
    };

    this.canvasBox = document.createElement('canvas');
    this.canvasBox.width = this.fightBox.inner.width;
    this.canvasBox.height = this.fightBox.inner.height;
    this._ctxBox = this.canvasBox.getContext('2d')!;
    this._ctxBox.contextRect = this.fightBox.inner;
  }

  drawBoxToScreen(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.canvasBox, this.fightBox.inner.x, this.fightBox.inner.y);
    this._ctxBox.clearRect(
      0,
      0,
      this.fightBox.inner.width,
      this.fightBox.inner.height
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'white';
    ctx.fillRect(...this.fightBox.outer.getRectProperties());
    ctx.fillStyle = 'black';
    ctx.fillRect(...this.fightBox.inner.getRectProperties());
  }

  get innerBox() {
    return this.fightBox.inner;
  }

  get outerBox() {
    return this.fightBox.outer;
  }

  get ctxBox() {
    return this._ctxBox;
  }
}

export default FightBox;
