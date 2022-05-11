import {
  Rectangle,
  Position,
  RectPosition,
  RectanlgeObject,
} from './interfaces/interfaces';

class RectObject implements RectanlgeObject {
  private _width: number;
  private _height: number;

  constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
  }

  getRect(rectPos: RectPosition) {
    const rect = new Rect(0, 0, this._width, this._height);

    if (rectPos.center) {
      rect.center = rectPos.center;
    } else if (rectPos.topLeft) {
      rect.topLeft = rectPos.topLeft;
    } else if (rectPos.topRight) {
      rect.topRight = rectPos.topRight;
    } else if (rectPos.bottomLeft) {
      rect.bottomLeft = rectPos.bottomLeft;
    } else if (rectPos.bottomRight) {
      rect.bottomRight = rectPos.bottomRight;
    }

    return rect;
  }
}

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
    return this.y + this.height;
  }

  get left() {
    return this.x;
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

  set top(value: number) {
    this.y = value;
  }

  set right(value: number) {
    this.x = value - this.width;
  }

  set bottom(value: number) {
    this.y = value - this.height;
  }

  set left(value: number) {
    this.x = value;
  }

  set topLeft(value: Position) {
    this.left = value.x;
    this.top = value.y;
  }

  set topRight(value: Position) {
    this.right = value.x;
    this.top = value.y;
  }

  set bottomLeft(value: Position) {
    this.left = value.x;
    this.bottom = value.y;
  }

  set bottomRight(value: Position) {
    this.right = value.x;
    this.bottom = value.y;
  }

  set center(value: Position) {
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;

    this.left = value.x - halfWidth;
    this.top = value.y - halfHeight;
  }
}

export default RectObject;
