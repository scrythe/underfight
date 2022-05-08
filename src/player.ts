import { Position, Speed, Keys } from './interfaces';

class Player {
  private width: number;
  private height: number;
  private pos: Position;
  private maxSpeed: Speed;
  private speed: Speed;

  constructor(gameWidth: number, gameHeight: number) {
    this.width = 150;
    this.height = 150;
    this.pos = {
      x: gameWidth / 2 - this.width / 2,
      y: gameHeight / 2 - this.height / 2,
    };
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
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  update(deltatime: number) {
    this.pos.x += this.speed.x / deltatime;
    this.pos.y += this.speed.y / deltatime;
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
