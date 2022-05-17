import {
  Speed,
  Rectangle,
  RectanlgeObject,
  Position,
  BulletType,
} from './interfaces';
import RectObject from './rectangle';

class Bullet implements BulletType {
  private bulletObject: RectanlgeObject;
  private _rect: Rectangle;
  private maxSpeed = 80;
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

  get rect() {
    return this._rect;
  }

  get angle() {
    return this._angle;
  }
}

export default Bullet;
