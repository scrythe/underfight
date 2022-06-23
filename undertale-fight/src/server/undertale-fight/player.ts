import {
  Keys,
  HeartType,
  HeartMap,
} from '../../shared/undertale-fight/interface';
import { Rect } from '../../shared/undertale-fight/rectangle';
import { RedHeart, BlueHeart } from './hearts';
import { PlayerState } from '../../shared/undertale-fight/stateInterface';

const heartMap: HeartMap<typeof RedHeart, typeof BlueHeart> = {
  RedHeart,
  BlueHeart,
};

class Player {
  private SPEED = 2;
  private box: Rect;
  private heart: RedHeart | BlueHeart;

  constructor(box: Rect) {
    this.box = box;
    this.heart = new RedHeart(this.box, this.box.midBottom, this.SPEED);
  }

  private checkAndPlaceInsideBox() {
    // top
    if (this.box.top > this.heart.rect.top) this.heart.rect.top = this.box.top;
    // right
    if (this.box.right < this.heart.rect.right)
      this.heart.rect.right = this.box.right;
    // bottom
    if (this.box.bottom < this.heart.rect.bottom)
      this.heart.rect.bottom = this.box.bottom;
    // left
    if (this.box.left > this.heart.rect.left)
      this.heart.rect.left = this.box.left;
  }

  switchHeart(heartType: HeartType) {
    const heart = heartMap[heartType];
    this.heart = new heart(this.box, this.heart.rect.center, this.SPEED);
  }

  inputs(keys: Keys) {
    this.heart.inputs(keys);
  }

  update(keys: Keys) {
    this.heart.update();
    this.inputs(keys);
    this.checkAndPlaceInsideBox();
  }

  getHeartType() {
    if (this.heart instanceof RedHeart) return 'RedHeart';
    return 'BlueHeart';
  }

  getPlayerState(): PlayerState {
    const heartType = this.heart.heartType;
    const playerPos = { x: this.rect.x, y: this.rect.y };

    return { heartType, playerPos };
  }

  get rect() {
    return this.heart.rect;
  }
}

export default Player;
