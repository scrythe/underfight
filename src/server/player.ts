import { Speed, Keys, PlayerPhase, Position } from './interfaces';
import { BulletState, PlayerState } from '../shared/stateInterfaces';
import { Bullet, Rocket } from './bullet';
import InputHandler from './input';
import RectSurface, { Rect } from '../shared/rectangle';
import { ShipConst } from '../shared/gameConstants';
import { SocketInterface } from '../shared/socketInterface';

class Ship {
  private playerObject: RectSurface;
  private _rect: Rect;
  private maxSpeed: Speed;
  private speed: Speed;

  constructor(playerPos: Position) {
    const width = ShipConst.width;
    const height = ShipConst.height;
    this.playerObject = new RectSurface(width, height);
    this._rect = this.playerObject.getRect({ center: playerPos });
    this.maxSpeed = {
      x: 6,
      y: 6,
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
  private _damaged: boolean;
  private _bullets: Bullet[];
  private _username: string;
  private _socket: SocketInterface;
  private _hp: number;
  private maxHealth = ShipConst.maxHealth;
  private _lastKiller?: string;
  private _killed: boolean;
  private kills: number;

  constructor(
    gameWidth: number,
    gameHeight: number,
    username: string,
    socket: SocketInterface
  ) {
    const center = { x: gameWidth / 2, y: gameHeight / 2 };
    this.player = new Ship(center);
    this._angle = 0;
    this._charge = 0;
    this._inputHandler = new InputHandler();
    this._damaged = false;
    this._bullets = [];
    this._username = username;
    this._socket = socket;
    this._hp = this.maxHealth;
    this._killed = false;
    this.kills = 0;
  }

  private inputs() {
    if (this.player instanceof Rocket) return;

    this.player.move(this._inputHandler.keys);
    if (this._inputHandler.keys.chargeAttack.pressed && this._charge >= 10) {
      if (this.swtichPlayerPhase(PlayerPhase.Rocket)) this._charge = 0;
    }
  }

  swtichPlayerPhase(state: PlayerPhase) {
    if (state == PlayerPhase.Ship) {
      this.player = new Ship(this.player.rect.center);
    } else {
      this.player = new Rocket(this.player.rect.center, this._angle);
    }
    return true;
  }

  update() {
    this.player.update();
    this.inputs();
    this.updateBullets();

    if (this.player instanceof Rocket) {
      this.player.angle = this._angle;
      if (this.player.checkEndReached())
        this.swtichPlayerPhase(PlayerPhase.Ship);
    }
  }

  takeDamage(killer: string, damage: number = 1) {
    this._hp -= damage;
    if (this.gotKilled()) {
      this._lastKiller = killer;
      this._killed = true;
    }
  }

  gotKilled() {
    if (this._hp == 0) return true;
    return false;
  }

  chargeUp() {
    this._charge += 1;
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

  getState() {
    const pos = {
      x: this.rect.center.x,
      y: this.rect.center.y,
    };
    const playerState: PlayerState = {
      pos,
      angle: this.angle,
      damaged: this.damaged,
      charge: this.charge,
      phase: this.playerPhase,
      username: this.username,
      hp: this._hp,
    };
    return playerState;
  }

  get socket() {
    return this._socket;
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

  get username() {
    return this._username;
  }

  get lastKiller() {
    return this._lastKiller;
  }

  get killed() {
    return this._killed;
  }

  set killed(value: boolean) {
    this._killed = value;
  }

  set hp(value: number) {
    this._hp = value;
  }

  killUp() {
    this.kills += 1;
  }

  getLeaderboardStats() {
    const username = this._username;
    const kills = this.kills;
    return { username, kills };
  }
}

export default Player;
