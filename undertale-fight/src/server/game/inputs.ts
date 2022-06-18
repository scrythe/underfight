import { Keys } from '../../shared/interface';
import GameEventEmitter from './gameEventEmitter';

class InputHandler {
  private _keys: Keys;

  constructor(gameEventEmitter: GameEventEmitter) {
    this._keys = {
      up: { pressed: false },
      right: { pressed: false },
      down: { pressed: false },
      left: { pressed: false },
      fire: { pressed: false },
    };

    gameEventEmitter.on('sendKey', (pressedKey, value) => {
      this._keys[pressedKey].pressed = value;
    });
  }

  get keys() {
    return this._keys;
  }
}

export default InputHandler;
