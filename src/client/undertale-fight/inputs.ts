import { KeyMap, Position } from '../../shared/undertale-fight/interface';
import { ClientInterface } from '../../shared/socketInterface';

const keyMap: KeyMap = {
  ArrowUp: 'up',
  ArrowRight: 'right',
  ArrowDown: 'down',
  ArrowLeft: 'left',

  w: 'up',
  d: 'right',
  s: 'down',
  a: 'left',

  Enter: 'fire',
};

function isOfKeyMap(key: string): key is keyof KeyMap {
  return key in keyMap;
}

class InputHandler {
  private _hoveredPos: Position;

  constructor(socket: ClientInterface, canvas: HTMLCanvasElement) {
    addEventListener('keydown', ({ key }) => {
      if (!isOfKeyMap(key)) return;
      const pressedKey = keyMap[key];
      socket.emit('sendKeysUndertale', pressedKey, true);
    });

    addEventListener('keyup', ({ key }) => {
      if (!isOfKeyMap(key)) return;
      const pressedKey = keyMap[key];
      socket.emit('sendKeysUndertale', pressedKey, false);
    });

    this._hoveredPos = { x: 0, y: 0 };

    const canvasPos = canvas.getBoundingClientRect();

    canvas.addEventListener('mousemove', (e) => {
      const x = e.x - canvasPos.x;
      const y = e.y - canvasPos.y;
      const pos = { x, y };
      this._hoveredPos = pos;
    });
  }

  get hoveredPos() {
    return this._hoveredPos;
  }
}

export default InputHandler;
