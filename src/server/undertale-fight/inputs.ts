import { Keys } from '../../shared/undertale-fight/interface';
import { SocketInterface } from '../../shared/socketInterface';

class InputHandler {
  private _keys: Keys;

  constructor(runner: SocketInterface) {
    this._keys = {
      up: { pressed: false },
      right: { pressed: false },
      down: { pressed: false },
      left: { pressed: false },
      fire: { pressed: false },
    };

    runner.on('sendKeysUndertale', (pressedKey, value) => {
      this._keys[pressedKey].pressed = value;
    });
  }

  get keys() {
    return this._keys;
  }
}

export default InputHandler;
