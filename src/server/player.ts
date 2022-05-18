import { Speed, Rectangle, RectanlgeObject } from './interfaces';
import { BulletState } from '../shared/stateInterfaces';
import RectObject from './rectangle';
import Bullet from './bullet';
import InputHandler from './input';

class Player {
  private playerObject: RectanlgeObject;
  private _rect: Rectangle;
  private maxSpeed: Speed;
  private speed: Speed;
  private _angle: number;
  private _bullets: Bullet[];
  private _inputHandler: InputHandler;
  private _name: string;
  private _damaged: boolean;

  constructor(gameWidth: number, gameHeight: number, name: string) {
    const width = 150;
    const height = 150;
    this.playerObject = new RectObject(width, height);
    const center = { x: gameWidth / 2, y: gameHeight / 2 };
    this._rect = this.playerObject.getRect({ center });
    this.maxSpeed = {
      x: 20,
      y: 20,
    };
    this.speed = {
      x: 0,
      y: 0,
    };
    this._angle = 0;
    this._bullets = [];
    this._inputHandler = new InputHandler();
    this._name = name;
    this._damaged = false;
  }

  update() {
    this._rect.x += this.speed.x;
    this._rect.y += this.speed.y;
    this.updateBullets();
  }

  move() {
    // up or down
    const keys = this._inputHandler.keys;
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

  shootBullet() {
    const fire = this._inputHandler.fire;
    if (fire.pressed) {
      const bullet = new Bullet(this._rect.center, this._angle);
      this._bullets.push(bullet);
      fire.pressed = false;
    }
  }

  removeBullet(bullet: number | Bullet) {
    let bulletIndex: number;
    if (typeof bullet != 'number') {
      bulletIndex = this._bullets.indexOf(bullet);
    } else {
      bulletIndex = bullet;
    }
    this._bullets.splice(bulletIndex, 1);
  }

  getBulletStates() {
    const bulletsStates: BulletState[] = [];
    this._bullets.forEach((bullet) => {
      bulletsStates.push(bullet.getBulletState());
    });
    return bulletsStates;
  }

  private updateBullets() {
    this._bullets.forEach((bullet, index) => {
      bullet.update();
      if (bullet.checkEndReached()) this.removeBullet(index);
    });
  }

  get rect() {
    return this._rect;
  }

  get angle() {
    return this._angle;
  }

  set angle(value: number) {
    this._angle = value;
  }

  get bullets() {
    return this._bullets;
  }

  get name() {
    return this._name;
  }

  get inputHandler() {
    return this._inputHandler;
  }

  get damaged() {
    return this._damaged;
  }

  set damaged(value: boolean) {
    this._damaged = value;
  }
}

export default Player;
