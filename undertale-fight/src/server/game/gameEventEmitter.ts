import StrictEventEmitter from '../../shared/strictEventEmitter';
import { Keys, Position } from '../../shared/interface';

export interface GameEvents {
  sendPos(pos: Position): void;
  sendKey(pressedKey: keyof Keys, value: boolean): void;
}

class GameEventEmitter extends StrictEventEmitter<GameEvents> {}

export default GameEventEmitter;
