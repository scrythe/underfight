import RectObject, { Rect } from '../../shared/rectangle';
import { FightBoxType } from '../../shared/interface';

class FightBox {
  private fightBox: FightBoxType<Rect>;

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
  }

  get innerBox() {
    return this.fightBox.inner;
  }

  get outerBox() {
    return this.fightBox.outer;
  }
}

export default FightBox;
