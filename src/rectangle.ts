import { Rectangle } from './interfaces';

class Rect implements Rectangle {
  private _x: number;
  private _y: number;
  private _width: number;
  private _height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get top() {
    return this.y;
  }

  get right() {
    return this.x + this.width;
  }

  get bottom() {
    return this.x + this.height;
  }

  get left() {
    return this.y;
  }

  get topLeft() {
    return { x: this.left, y: this.top };
  }

  get topRight() {
    return { x: this.right, y: this.top };
  }

  get bottomLeft() {
    return { x: this.left, y: this.bottom };
  }

  get bottomRight() {
    return { x: this.right, y: this.bottom };
  }

  get center() {
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;

    const centerX = this.x + halfWidth;
    const centerY = this.y + halfHeight;

    return { x: centerX, y: centerY };
  }

  set x(value: number) {
    this._x = value;
  }

  set y(value: number) {
    this._y = value;
  }
}

export default Rect;
