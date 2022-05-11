import { Keys, KeyMap, Position, Key } from './interfaces/interfaces';

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
  private _keys: Keys;
  private _mousePos: Position;

  constructor(gameWidth: number, gameHeight: number) {
    this._mousePos = { x: gameWidth / 2, y: gameHeight / 2 };

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

  get keys(): Keys {
    return this._keys;
  }

  get mousePos() {
    return this._mousePos;
  }

  get fire() {
    return this._keys.fire;
  }

  set fire(value: Key) {
    this._keys.fire = value;
  }
}

export default InputHandler;
