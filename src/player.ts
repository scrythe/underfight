import { Speed, Keys, Rectangle, RectanlgeObject } from './interfaces';
import RectObject from './rectangle';

class Player {
  private width: number;
  private height: number;
  private playerObject: RectanlgeObject;
  private rect: Rectangle;
  private maxSpeed: Speed;
  private speed: Speed;

  constructor(gameWidth: number, gameHeight: number) {
    this.width = 150;
    this.height = 150;
    this.playerObject = new RectObject(this.width, this.height);
    const center = { x: gameWidth / 2, y: gameHeight / 2 };
    this.rect = this.playerObject.getRect({ center });
    this.maxSpeed = {
      x: 50,
      y: 50,
    };
    this.speed = {
      x: 0,
      y: 0,
    };
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillRect(this.rect.x, this.rect.y, this.width, this.height);
  }

  update(deltatime: number) {
    this.rect.x += this.speed.x / deltatime;
    this.rect.y += this.speed.y / deltatime;
  }

  move(keys: Keys) {
    // up or down
    if (keys.up.pressed) {
      this.speed.y = -this.maxSpeed.y;
    } else if (keys.down.pressed) {
      this.speed.y = this.maxSpeed.y;
    } else {
      this.speed.y = 0;
    }

    // right or left
    if (keys.right.pressed) {
      this.speed.x = this.maxSpeed.y;
    } else if (keys.left.pressed) {
      this.speed.x = -this.maxSpeed.y;
    } else {
      this.speed.x = 0;
    }
  }

  moveLeftOrRight(right = false, left: false) {
    if (right) {
      this.speed.y = this.maxSpeed.y;
    } else if (left) {
      this.speed.y = -this.maxSpeed.y;
    } else {
      this.speed.y = 0;
    }
  }
}

export default Player;
