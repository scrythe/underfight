import { Speed, Rectangle, RectanlgeObject, Position } from './interfaces';
import RectObject from './rectangle';

class Bullet {
  private bulletObject: RectanlgeObject;
  private _rect: Rectangle;
  private maxSpeed = 8;
  private speed: Speed;
  private _angle: number;
  private flightLength: number;
  private maxLength = 1000;

  constructor(playerPos: Position, angle: number) {
    const bulletWidth = 50;
    const bulletHeight = 10;
    this.flightLength = 0;
    this.bulletObject = new RectObject(bulletWidth, bulletHeight);
    this._rect = this.bulletObject.getRect({ center: playerPos });
    this._angle = angle;
    this.speed = {
      x: Math.cos(this._angle) * this.maxSpeed,
      y: Math.sin(this._angle) * this.maxSpeed,
    };
  }

  checkEndReached() {
    return this.flightLength >= this.maxLength;
  }

  update() {
    this._rect.x += this.speed.x;
    this._rect.y += this.speed.y;
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

  get rect() {
    return this._rect;
  }

  get angle() {
    return this._angle;
  }
}

export default Bullet;
