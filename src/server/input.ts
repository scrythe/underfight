import { Keys, Position, Key, InputHandlerType } from './interfaces';

class InputHandler implements InputHandlerType {
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
  }

  updateKeys(keys: Keys) {
    this._keys = keys;
  }

  updateMousePos(mousePos: Position) {
    this._mousePos = mousePos;
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
