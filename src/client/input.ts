import { Keys, KeyMap, Position, Key } from './interfaces';

const keyMap: KeyMap = {
  ArrowUp: 'up',
  ArrowRight: 'right',
  ArrowDown: 'down',
  ArrowLeft: 'left',

  w: 'up',
  d: 'right',
  s: 'down',
  a: 'left',

  ' ': 'fire',
};

function isOfKeyMap(key: string): key is keyof typeof keyMap {
  return key in keyMap;
}

class InputHandler {
  private gameWidth;
  private gameHeight;
  private _keys: Keys;
  private _mousePos: Position;
  private _angle: number;

  constructor(gameWidth: number, gameHeight: number) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this._mousePos = { x: gameWidth / 2, y: gameHeight / 2 };
    this._angle = 0;

    this._keys = {
      up: { pressed: false },
      right: { pressed: false },
      down: { pressed: false },
      left: { pressed: false },
      fire: { pressed: false },
    };

    addEventListener('keydown', ({ key }) => {
      if (isOfKeyMap(key)) {
        const pressedKey = keyMap[key];
        this._keys[pressedKey].pressed = true;
      }
    });

    addEventListener('keyup', ({ key }) => {
      if (isOfKeyMap(key)) {
        const pressedKey = keyMap[key];
        this._keys[pressedKey].pressed = false;
      }
    });

    addEventListener('click', () => {
      this._keys.fire.pressed = true;
    });

    addEventListener('mousemove', ({ clientX, clientY }) => {
      this._mousePos.x = clientX;
      this._mousePos.y = clientY;
    });
  }

  private calculateAngle() {
    const x = this._mousePos.x - this.gameWidth / 2;
    const y = this._mousePos.y - this.gameHeight / 2;
    this._angle = Math.atan2(y, x);
  }

  get angle() {
    this.calculateAngle();
    return this._angle;
  }

  get keys(): Keys {
    return this._keys;
  }

  get fire() {
    return this._keys.fire;
  }

  set fire(value: Key) {
    this._keys.fire = value;
  }
}

export default InputHandler;
