import { Position, RectPosition, RectProperties } from './interface';

class RectSurface {
  private _width: number;
  private _height: number;

  constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
  }

  getRect(rect: { center: Position }): Rect;
  getRect(rect: { topLeft: Position }): Rect;
  getRect(rect: { topRight: Position }): Rect;
  getRect(rect: { bottomLeft: Position }): Rect;
  getRect(rect: { bottomRight: Position }): Rect;
  getRect(rect: { midTop: Position }): Rect;
  getRect(rect: { midRight: Position }): Rect;
  getRect(rect: { midBottom: Position }): Rect;
  getRect(rect: { midLeft: Position }): Rect;
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
    } else if (rectPos.midTop) {
      rect.midTop = rectPos.midTop;
    } else if (rectPos.midRight) {
      rect.midRight = rectPos.midRight;
    } else if (rectPos.midBottom) {
      rect.midBottom = rectPos.midBottom;
    } else if (rectPos.midLeft) {
      rect.midLeft = rectPos.midLeft;
    }

    return rect;
  }
}

export class Rect {
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

  getRectProperties(): RectProperties {
    return [this._x, this._y, this._width, this._height];
  }

  getInsideBoxRectProperties(rect: Rect): RectProperties {
    const { x, y } = Rect.getInsideBoxPos(
      { x: this._x, y: this._y },
      { x: rect.x, y: rect.y }
    );

    return [x, y, this._width, this._height];
  }

  static getInsideBoxPos(posObj: Position, posBox: Position): Position {
    const x = posObj.x - posBox.x;
    const y = posObj.y - posBox.y;
    return { x, y };
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

  get midTop() {
    return { x: this.center.x, y: this.top };
  }

  get midRight() {
    return { x: this.right, y: this.center.y };
  }

  get midBottom() {
    return { x: this.center.x, y: this.bottom };
  }

  get midLeft() {
    return { x: this.left, y: this.center.y };
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

  set midTop(value: Position) {
    this.center = { x: value.x, y: this.center.y };
    this.top = value.y;
  }

  set midRight(value: Position) {
    this.center = { x: this.center.x, y: value.y };
    this.right = value.x;
  }

  set midBottom(value: Position) {
    this.center = { x: value.x, y: this.center.y };
    this.bottom = value.y;
  }

  set midLeft(value: Position) {
    this.center = { x: this.center.x, y: value.y };
    this.left = value.x;
  }
}

export default RectSurface;
