import {
  Speed,
  Rectangle,
  RectanlgeObject,
  Position,
} from './interfaces/interfaces';
import RectObject from './rectangle';

class Bullet {
  private bulletImage: HTMLImageElement;
  private bulletObject: RectanlgeObject;
  private _rect: Rectangle;
  private maxSpeed: number;
  private speed: Speed;
  private angle: number;

  constructor(playerPos: Position, angle: number) {
    this.bulletImage = document.querySelector('#bullet-image')!;
    this.bulletObject = new RectObject(
      this.bulletImage.width,
      this.bulletImage.height
    );
    this._rect = this.bulletObject.getRect({ center: playerPos });
    this.angle = angle;
    this.maxSpeed = 80;
    this.speed = {
      x: Math.cos(this.angle) * this.maxSpeed,
      y: Math.sin(this.angle) * this.maxSpeed,
    };
  }

  update() {
    this._rect.x += this.speed.x;
    this._rect.y += this.speed.y;
  }

  get rect() {
    return this._rect;
  }
}

export default Bullet;
