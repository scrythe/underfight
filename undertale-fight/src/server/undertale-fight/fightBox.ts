import RectObject, { Rect } from '../../shared/rectangle';
import { FightBoxType } from '../../shared/interface';
import { FightBoxConst } from '../../shared/gameConstants';

class FightBox {
  private fightBox: FightBoxType<Rect>;

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
  }

  get innerBox() {
    return this.fightBox.inner;
  }

  get outerBox() {
    return this.fightBox.outer;
  }
}

export default FightBox;
