import { Speed, Position } from './interfaces';
import RectSurface, { Rect } from '../shared/rectangle';
import { AbractBulletConst } from '../shared/gameConstants';

class AbsractBullet {
  private bulletObject: RectSurface;
  protected _rect: Rect;
  protected maxSpeed = 8;
  protected speed: Speed;
  protected _angle: number;

  constructor(playerPos: Position, angle: number) {
    const bulletWidth = AbractBulletConst.width;
    const bulletHeight = AbractBulletConst.height;
    this.bulletObject = new RectSurface(bulletWidth, bulletHeight);
    this._rect = this.bulletObject.getRect({ center: playerPos });
    this._angle = angle;
    this.speed = {
      x: Math.cos(this._angle) * this.maxSpeed,
      y: Math.sin(this._angle) * this.maxSpeed,
    };
  }

  update() {
    this._rect.x += this.speed.x;
    this._rect.y += this.speed.y;
  }

  get rect() {
    return this._rect;
  }

  get angle() {
    return this._angle;
  }
}

export class Bullet extends AbsractBullet {
  private flightLength: number;
  private maxLength = 1000;

  constructor(playerPos: Position, angle: number) {
    super(playerPos, angle);
    this.flightLength = 0;
  }

  checkEndReached() {
    return this.flightLength >= this.maxLength;
  }

  override update() {
    super.update();
    this.flightLength += this.maxSpeed;
  }

  getBulletState() {
    const pos = {
      x: this._rect.center.x,
      y: this._rect.center.y,
    };
    const bulletState = { pos, angle: this._angle };
    return bulletState;
  }
}

export class Rocket extends AbsractBullet {
  private acceleration = 1.02;
  protected override maxSpeed = 35;
  private currentSpeed: number;
  constructor(playerPos: Position, angle: number) {
    super(playerPos, angle);
    this.currentSpeed = 5;
  }

  updateSpeed() {
    if (this.currentSpeed <= this.maxSpeed)
      this.currentSpeed *= this.acceleration;
    this.speed = {
      x: Math.cos(this._angle) * this.currentSpeed,
      y: Math.sin(this._angle) * this.currentSpeed,
    };
  }

  override update() {
    super.update();
    this.updateSpeed();
  }

  override set angle(value: number) {
    this._angle = value;
  }
}
