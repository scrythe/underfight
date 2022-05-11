import {
  Speed,
  Keys,
  Rectangle,
  RectanlgeObject,
  Position,
  Key,
} from './interfaces';
import RectObject from './rectangle';
import { rotateAndDrawObject } from './functions';
import Bullet from './bullet';

class Player {
  private playerObject: RectanlgeObject;
  private _rect: Rectangle;
  private maxSpeed: Speed;
  private speed: Speed;
  private _angle: number;
  private _bullets: Bullet[];

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
    this._angle = 0;
    this._bullets = [];
  }

  update() {
    this._rect.x += this.speed.x;
    this._rect.y += this.speed.y;
    this.updateBullets();
  }

  move(keys: Keys) {
    // up or down
    if (keys.up.pressed && keys.down.pressed) {
      this.speed.y = 0;
    } else if (keys.up.pressed) {
      this.speed.y = -this.maxSpeed.y;
    } else if (keys.down.pressed) {
      this.speed.y = this.maxSpeed.y;
    } else {
      this.speed.y = 0;
    }

    // right or left
    if (keys.right.pressed && keys.left.pressed) {
      this.speed.x = 0;
    } else if (keys.right.pressed) {
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

  shootBullet(fire: Key) {
    if (fire.pressed) {
      const bullet = new Bullet(this._rect.center, this._angle);
      this._bullets.push(bullet);
      fire.pressed = false;
    }
  }

  updateBullets() {
    this._bullets.forEach((bullet) => {
      bullet.update();
    });
  }

  drawBullets(ctx: CanvasRenderingContext2D, cameraPos: Position) {
    this._bullets.forEach((bullet) => {
      bullet.draw(ctx, cameraPos);
    });
  }

  get rect() {
    return this._rect;
  }

  set angle(value: number) {
    this._angle = value;
  }

  get bullets() {
    return this._bullets;
  }
}

export default Player;
