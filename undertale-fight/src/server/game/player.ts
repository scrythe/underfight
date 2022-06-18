import { Keys, HeartType, HeartMap } from '../../shared/interface';
import { Rect } from '../../shared/rectangle';
import { RedHeart, BlueHeart } from './hearts';
import { PlayerState } from '../../shared/stateInterface';

const heartMap: HeartMap<typeof RedHeart, typeof BlueHeart> = {
  RedHeart,
  BlueHeart,
};

class Player {
  private SPEED = 2;
  private box: Rect;
  private heart: RedHeart | BlueHeart;
  private lastTimeSwitched: number;
  private switchDelay = 200;

  constructor(box: Rect) {
    this.box = box;
    this.heart = new RedHeart(this.box, this.box.center, this.SPEED);
    this.lastTimeSwitched = Date.now();
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

  private canSwitch() {
    const currentTime = Date.now();
    return this.lastTimeSwitched + this.switchDelay <= currentTime;
  }

  private switchHeart(heartType: HeartType): void;
  private switchHeart(): void;
  private switchHeart(heartType?: HeartType) {
    if (!heartType) {
      heartType = 'RedHeart';
      if (this.heart.heartType == 'RedHeart') heartType = 'BlueHeart';
    }
    if (!this.canSwitch()) return;
    const heart = heartMap[heartType];
    this.heart = new heart(this.box, this.heart.rect.center, this.SPEED);
    this.lastTimeSwitched = Date.now();
  }

  inputs(keys: Keys) {
    this.heart.inputs(keys);
    if (keys.fire.pressed) {
      this.switchHeart();
    }
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
