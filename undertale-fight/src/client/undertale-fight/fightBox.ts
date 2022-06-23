import RectObject, { Rect } from '../../shared/undertale-fight/rectangle';
import { FightBoxType } from '../../shared/undertale-fight/interface';
import { FightBoxConst } from '../../shared/undertale-fight/gameConstants';

class FightBox {
  private fightBox: FightBoxType<Rect>;
  private canvasBox: HTMLCanvasElement;
  private _ctxBox: CanvasRenderingContext2D;

  constructor(screen: Rect) {
    const outerFightBoxObject = new RectObject(
      FightBoxConst.outer.width,
      FightBoxConst.outer.height
    );
    const outerfightBox = outerFightBoxObject.getRect({
      midTop: screen.center,
    });

    const innerFightBoxObject = new RectObject(
      FightBoxConst.inner.width,
      FightBoxConst.inner.height
    );
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
