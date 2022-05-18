import { Keys, Key } from './interfaces';

class InputHandler {
  private _keys: Keys;
  constructor() {
    this._keys = {
      up: { pressed: false },
      right: { pressed: false },
      down: { pressed: false },
      left: { pressed: false },
      fire: { pressed: false },
    };
  }

  updateKeys(keys: Keys) {
    this._keys = keys;
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
