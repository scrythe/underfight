import { Position, Vector } from './interfaces';
export function getVector(a: Position, b: Position): Vector {
  const x = b.x - a.x;
  const y = b.y - a.y;
  return { x, y };
}
