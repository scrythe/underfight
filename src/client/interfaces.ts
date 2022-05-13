import { Keys, Position, ClientRect } from '../shared/interfaces';

export interface KeyMap {
  ArrowUp: keyof Keys;
  ArrowRight: keyof Keys;
  ArrowDown: keyof Keys;
  ArrowLeft: keyof Keys;

  w: keyof Keys;
  d: keyof Keys;
  s: keyof Keys;
  a: keyof Keys;

  ' ': keyof Keys;
}

export interface Screen {
  width: number;
  height: number;
}

export interface CameraInterface {
  pos: Position;
  watch(target: ClientRect): void;
}

export * from '../shared/interfaces';
