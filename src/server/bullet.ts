import { Speed, Rectangle, RectanlgeObject, Position } from './interfaces';
import RectObject from './rectangle';

class AbsractBullet {
  private bulletObject: RectanlgeObject;
  protected _rect: Rectangle;
  protected maxSpeed = 8;
  protected speed: Speed;
  protected _angle: number;

  constructor(playerPos: Position, angle: number) {
    const bulletWidth = 50;
    const bulletHeight = 10;
    this.bulletObject = new RectObject(bulletWidth, bulletHeight);
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

  update() {
    super.update();
    this.flightLength += this.maxSpeed;
  }

  getBulletState() {
    const bulletRect = {
      center: this._rect.center,
      width: this._rect.width,
      height: this._rect.height,
    };
    const bulletState = { rect: bulletRect, angle: this._angle };
    return bulletState;
  }
}

export class Rocket extends AbsractBullet {
  private acceleration = 1.02;
  protected maxSpeed = 35;
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

  update() {
    super.update();
    this.updateSpeed();
  }

  set angle(value: number) {
    this._angle = value;
  }
}
