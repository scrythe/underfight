import {
  Speed,
  Keys,
  Rectangle,
  RectanlgeObject,
  Position,
} from './interfaces';
import RectObject from './rectangle';
import { rotateAndDrawObject } from './functions';

class Player {
  private playerObject: RectanlgeObject;
  private _rect: Rectangle;
  private maxSpeed: Speed;
  private speed: Speed;
  private angle: number;

  constructor(gameWidth: number, gameHeight: number) {
    const width = 150;
    const height = 150;
    this.playerObject = new RectObject(width, height);
    const center = { x: gameWidth / 2, y: gameHeight / 2 };
    this._rect = this.playerObject.getRect({ center });
    this.maxSpeed = {
      x: 50,
      y: 50,
    };
    this.speed = {
      x: 0,
      y: 0,
    };
    this.angle = 0;
  }

  draw(ctx: CanvasRenderingContext2D, cameraPos: Position) {
    const insideCameraPos: Position = {
      x: this._rect.center.x - cameraPos.x,
      y: this._rect.center.y - cameraPos.y,
    };
    rotateAndDrawObject(ctx, insideCameraPos, this.rect, this.angle);
  }

  update(deltatime: number) {
    this._rect.x += this.speed.x / deltatime;
    this._rect.y += this.speed.y / deltatime;
    this.angle += 1;
  }

  move(keys: Keys) {
    // up or down
    if (keys.up.pressed) {
      this.speed.y = -this.maxSpeed.y;
    } else if (keys.down.pressed) {
      this.speed.y = this.maxSpeed.y;
    } else {
      this.speed.y = 0;
    }

    // right or left
    if (keys.right.pressed) {
      this.speed.x = this.maxSpeed.y;
    } else if (keys.left.pressed) {
      this.speed.x = -this.maxSpeed.y;
    } else {
      this.speed.x = 0;
    }
  }

  moveLeftOrRight(right = false, left: false) {
    if (right) {
      this.speed.y = this.maxSpeed.y;
    } else if (left) {
      this.speed.y = -this.maxSpeed.y;
    } else {
      this.speed.y = 0;
    }
  }

  get rect() {
    return this._rect;
  }
}

export default Player;
