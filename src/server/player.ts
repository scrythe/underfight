import { Speed, Rectangle, RectanlgeObject, PlayerType } from './interfaces';
import RectObject from './rectangle';
import Bullet from './bullet';
import InputHandler from './input';

class Player implements PlayerType {
  private gameWidth: number;
  private gameHeight: number;
  private playerObject: RectanlgeObject;
  private _rect: Rectangle;
  private maxSpeed: Speed;
  private speed: Speed;
  private _angle: number;
  private _bullets: Bullet[];
  private _inputHandler: InputHandler;
  private _name: string;

  constructor(gameWidth: number, gameHeight: number, name: string) {
    const width = 150;
    const height = 150;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
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
    this._inputHandler = new InputHandler();
    this._name = name;
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

  private updateBullets() {
    this._bullets.forEach((bullet) => {
      bullet.update();
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
}

export default Player;
