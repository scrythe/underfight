import { Keys, Players, BulletType, Rectangle } from './interfaces';
import { PlayerState, BulletState, State } from '../shared/stateInterfaces';
import { ServerInterface } from '../shared/socketInterface';
import Player from './player';
import checkSatCollision from './sat';
import checkAABBCollision from './aabb';
import RotatedRect from './rotatedRectangle';

class Game {
  private GAME_WIDTH = 1536;
  private GAME_HEIGHT = 864;
  private FPS = 60;

  private players: Players;

  private io: ServerInterface;

  constructor(io: ServerInterface) {
    this.players = [];

    this.io = io;
  }

  startGame() {
    const fpsDuration = 1000 / this.FPS;
    setInterval(() => {
      this.update();
      const gameState = this.getState();
      this.io.emit('sendState', gameState);
    }, fpsDuration);
  }

  addPlayer(name: string) {
    const player = new Player(this.GAME_WIDTH, this.GAME_HEIGHT, name);
    this.players.push(player);
  }

  removePlayer(name: string) {
    const player = this.players.find((player) => player.name == name);
    if (player) {
      const playerIndex = this.players.indexOf(player);
      this.players.splice(playerIndex, 1);
    }
  }

  private updatePlayers() {
    this.players.forEach((player) => {
      player.update();
      player.move();
      player.shootBullet();
    });
  }

  update() {
    this.updatePlayers();
    this.collisionBullets();
  }

  private getAllBulletStates() {
    const bullets = this.getAllBullets();
    const bulletsState: BulletState[] = bullets.map((bullet) => {
      const bulletRect = {
        center: bullet.rect.center,
        width: bullet.rect.width,
        height: bullet.rect.height,
      };
      const bulletState = { rect: bulletRect, angle: bullet.angle };
      return bulletState;
    });
    return bulletsState;
  }

  private getAllBullets(players = this.players) {
    const bullets: BulletType[] = [];
    players.forEach((player) => bullets.push(...player.bullets));
    return bullets;
  }

  private getPlayerState() {
    const playerStates: PlayerState[] = [];
    this.players.forEach((player) => {
      const playerRect = {
        center: player.rect.center,
        width: player.rect.width,
        height: player.rect.height,
      };
      const playerState: PlayerState = {
        rect: playerRect,
        angle: player.angle,
        name: player.name,
        damaged: player.damaged,
      };
      playerStates.push(playerState);
    });
    return playerStates;
  }

  private collide(
    rect1: Rectangle,
    angle1: number,
    rect2: Rectangle,
    angle2: number
  ) {
    const rotatedRect1 = new RotatedRect(rect1, angle1);
    const rotatedRect2 = new RotatedRect(rect2, angle2);

    const collisionAABB = checkAABBCollision(
      rotatedRect1.hitBox,
      rotatedRect2.hitBox
    );

    // if no collision
    if (!collisionAABB) return false;
    const collisionSAT = checkSatCollision(rotatedRect1, rotatedRect2);
    // no sat collision
    if (!collisionSAT) return false;
    // collision
    return true;
  }

  private collisionBullets() {
    this.players.forEach((player) => {
      const playerIndex = this.players.indexOf(player);
      const enemies = this.players.filter(
        (player, index) => index !== playerIndex
      );
      const enemieBullets = this.getAllBullets(enemies);

      const enemieBulletsCollision = enemieBullets.map((bullet) => {
        const collision = this.collide(
          bullet.rect,
          bullet.angle,
          player.rect,
          player.angle
        );
        return collision;
      });
      const anyCollision = enemieBulletsCollision.some(
        (bulletCollision) => bulletCollision
      );
      player.damaged = anyCollision;
    });
  }

  private getState(): State {
    const playerStates = this.getPlayerState();
    const bulletsState: BulletState[] = this.getAllBulletStates();
    const state: State = { playerStates, bulletsState };
    return state;
  }

  private getSpecificPlayer(name: string) {
    const player = this.players.find((player) => player.name == name);
    return player;
  }

  handleInput(keys: Keys, angle: number, name: string) {
    const player = this.getSpecificPlayer(name);
    if (player) {
      player.inputHandler.updateKeys(keys);
      player.angle = angle;
    }
  }
}

export default Game;
