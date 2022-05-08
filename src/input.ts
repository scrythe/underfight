import { Keys } from './interfaces';

class InputHandler {
  private _keys: Keys;

  constructor() {
    this._keys = {
      up: { pressed: false },
      right: { pressed: false },
      down: { pressed: false },
      left: { pressed: false },
    };

    addEventListener('keydown', ({ key }) => {
      switch (key) {
        case 'ArrowUp':
          this._keys.up.pressed = true;
          break;
        case 'ArrowRight':
          this._keys.right.pressed = true;
          break;
        case 'ArrowDown':
          this._keys.down.pressed = true;
          break;
        case 'ArrowLeft':
          this._keys.left.pressed = true;
          break;
      }
    });

    addEventListener('keyup', ({ key }) => {
      switch (key) {
        case 'ArrowUp':
          this._keys.up.pressed = false;
          break;
        case 'ArrowRight':
          this._keys.right.pressed = false;
          break;
        case 'ArrowDown':
          this._keys.down.pressed = false;
          break;
        case 'ArrowLeft':
          this._keys.left.pressed = false;
          break;
      }
    });
  }

  get keys(): Keys {
    return this._keys;
  }
}

export default InputHandler;
