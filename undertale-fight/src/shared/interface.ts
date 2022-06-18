export interface Position {
  x: number;
  y: number;
}

export type Speed = Position;

export interface RectPosition {
  x?: number;
  y?: number;

  top?: number;
  right?: number;
  bottom?: number;
  left?: number;

  topLeft?: Position;
  topRight?: Position;
  bottomLeft?: Position;
  bottomRight?: Position;

  center?: Position;
  midTop?: Position;
  midRight?: Position;
  midBottom?: Position;
  midLeft?: Position;
}

export type Key = { pressed: boolean };

export interface Keys {
  up: Key;
  right: Key;
  down: Key;
  left: Key;
  fire: Key;
}

export interface KeyMap {
  ArrowUp: keyof Keys;
  ArrowRight: keyof Keys;
  ArrowDown: keyof Keys;
  ArrowLeft: keyof Keys;

  w: keyof Keys;
  d: keyof Keys;
  s: keyof Keys;
  a: keyof Keys;

  Enter: keyof Keys;
}

export interface FightBoxType<Rect> {
  inner: Rect;
  outer: Rect;
}

export interface HeartMap<RedHeart, BlueHeart> {
  RedHeart: RedHeart;
  BlueHeart: BlueHeart;
}

export type HeartType = keyof HeartMap<'', ''>;

export interface Attack {
  speed: Speed;
  end: number;
}

export interface BoneData {
  start: number;
  position: Position;
  attacks: Attack[];
  end: number;
}

export interface Schema {
  $schema: string;
  bonesData: BoneData[];
}

export type RectProperties = [number, number, number, number];
