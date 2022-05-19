import {
  Speed,
  Rectangle,
  RectanlgeObject,
  Keys,
  PlayerPhase,
  Position,
} from './interfaces';
import { BulletState } from '../shared/stateInterfaces';
import RectObject from './rectangle';
import { Bullet, Rocket } from './bullet';
import InputHandler from './input';

class Ship {
  private playerObject: RectanlgeObject;
  private _rect: Rectangle;
  private maxSpeed: Speed;
  private speed: Speed;

  constructor(playerPos: Position) {
    const width = 150;
    const height = 150;
    this.playerObject = new RectObject(width, height);
    this._rect = this.playerObject.getRect({ center: playerPos });
    this.maxSpeed = {
      x: 20,
      y: 20,
    };
    this.speed = {
      x: 0,
      y: 0,
    };
  }

  update() {
    this._rect.x += this.speed.x;
    this._rect.y += this.speed.y;
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

  get rect() {
    return this._rect;
  }
}

class Player {
  private player: Ship | Rocket;
  private _angle: number;
  private _charge: number;
  private _inputHandler: InputHandler;
  private _name: string;
  private _damaged: boolean;
  private _bullets: Bullet[];

  constructor(gameWidth: number, gameHeight: number, name: string) {
    const center = { x: gameWidth / 2, y: gameHeight / 2 };
    this.player = new Ship(center);
    this._angle = 0;
    this._charge = 0;
    this._inputHandler = new InputHandler();
    this._name = name;
    this._damaged = false;
    this._bullets = [];
    const randomPhaseNumber = Math.round(Math.random());
    if (randomPhaseNumber) this.swtichPlayerPhase(PlayerPhase.Rocket);
  }

  swtichPlayerPhase(state: PlayerPhase) {
    if (state == PlayerPhase.Ship) {
      this.player = new Ship(this.player.rect.center);
    } else {
      this.player = new Rocket(this.player.rect.center, this._angle);
    }
  }

  update() {
    this.player.update();
    this.updateBullets();

    if (this.player instanceof Rocket) this.player.angle = this._angle;
  }

  chargeUp() {
    this._charge += 1;
  }

  move() {
    if (this.player instanceof Ship) this.player.move(this._inputHandler.keys);
  }

  shootBullet() {
    if (!(this.player instanceof Ship)) return;
    const fire = this._inputHandler.fire;
    if (fire.pressed) {
      const bullet = new Bullet(this.player.rect.center, this._angle);
      this._bullets.push(bullet);
      fire.pressed = false;
    }
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

  removeBullet(bullet: number | Bullet) {
    let bulletIndex: number;
    if (typeof bullet != 'number') {
      bulletIndex = this._bullets.indexOf(bullet);
    } else {
      bulletIndex = bullet;
    }
    this._bullets.splice(bulletIndex, 1);
  }

  get angle() {
    return this._angle;
  }

  set angle(value: number) {
    this._angle = value;
  }

  get charge() {
    return this._charge;
  }

  get name() {
    return this._name;
  }

  get inputHandler() {
    return this._inputHandler;
  }

  get rect() {
    return this.player.rect;
  }

  get damaged() {
    return this._damaged;
  }

  set damaged(value: boolean) {
    this._damaged = value;
  }

  get bullets() {
    return this._bullets;
  }

  get playerPhase() {
    if (this.player instanceof Ship) return PlayerPhase.Ship;
    return PlayerPhase.Rocket;
  }
}

export default Player;
