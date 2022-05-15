import { Keys, Players } from './interfaces';
import { PlayerState, BulletState, State } from '../shared/stateInterfaces';
import { ServerInterface } from '../shared/socketInterface';
import Player from './player';

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

  updatePlayers() {
    this.players.forEach((player) => {
      player.update();
      player.move();
      player.shootBullet();
    });
  }

  update() {
    this.updatePlayers();
  }

  private getAllBulletStates() {
    const bulletsState: BulletState[] = [];
    this.players.forEach((player) => {
      player.bullets.forEach((bullet) => {
        const bulletRect = {
          center: bullet.rect.center,
          width: bullet.rect.width,
          height: bullet.rect.height,
        };
        const bulletState = { rect: bulletRect, angle: bullet.angle };
        bulletsState.push(bulletState);
      });
    });
    return bulletsState;
  }

  getPlayerState() {
    const playerStates: PlayerState[] = [];
    this.players.forEach((player) => {
      const playerRect = {
        center: player.rect.center,
        width: player.rect.width,
        height: player.rect.height,
      };
      const playerPerpendicularVectors =
        player.rotatedRect.perpendicularVectors;
      const playerState: PlayerState = {
        rect: playerRect,
        rotatedRectPerpendicularVectors: playerPerpendicularVectors,
        angle: player.angle,
        name: player.name,
      };
      playerStates.push(playerState);
    });
    return playerStates;
  }

  getState(): State {
    const playerStates = this.getPlayerState();
    const bulletsState: BulletState[] = this.getAllBulletStates();
    const state: State = { playerStates, bulletsState };
    return state;
  }

  getSpecificPlayer(name: string) {
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
