import { Keys } from './interfaces';
import { PlayerState, BulletState, State } from '../shared/stateInterfaces';
import {
  GameMode,
  ServerInterface,
  SocketInterface,
} from '../shared/socketInterface';
import Player from './player';
import checkSatCollision from './sat';
import checkAABBCollision from './aabb';
import RotatedRect from './rotatedRectangle';
import { Rect } from '../shared/rectangle';

class Game {
  private GAME_WIDTH = 1536;
  private GAME_HEIGHT = 864;
  private FPS = 60;

  private players: Player[];

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
      this.io.to('deepio').emit('sendState', gameState);
    }, fpsDuration);
  }

  addPlayer(username: string, socket: SocketInterface) {
    const player = new Player(
      this.GAME_WIDTH,
      this.GAME_HEIGHT,
      username,
      socket
    );
    this.players.push(player);
  }

  removePlayer(socketID: string) {
    const player = this.players.find((player) => player.socket.id == socketID);
    if (player) {
      const playerIndex = this.players.indexOf(player);
      this.players.splice(playerIndex, 1);
    }
  }

  private updatePlayers() {
    this.players.forEach((player) => {
      player.update();
      player.shootBullet();
    });
  }

  update() {
    this.updatePlayers();
    this.collisionBullets();
    this.killedPlayers();
  }

  private putKillerAndVictimInGame(killedPlayer: Player) {
    const killerName = killedPlayer.lastKiller;
    const killer = this.players.find((player) => player.username == killerName);
    if (!killer) return;
    this.switchMode('undertale', killer);
    this.switchMode('undertale', killedPlayer);

    this.removePlayer(killer.socket.id);
    this.removePlayer(killedPlayer.socket.id);
  }

  private killedPlayers() {
    const killedPlayers = this.players.filter((player) => player.killed);
    killedPlayers.forEach((player) => {
      player.killed = false;
      player.hp = 20;
      this.putKillerAndVictimInGame(player);
    });
  }

  private getAllBulletStates() {
    const bulletsState: BulletState[] = [];
    this.players.forEach((player) => {
      const playerBulletsStates = player.getBulletStates();
      bulletsState.push(...playerBulletsStates);
    });
    return bulletsState;
  }

  private switchMode(gameMode: GameMode, player: Player) {
    const socket = player.socket;
    if (gameMode == 'undertale') {
      socket.leave('deepio');
      socket.join('undertale');
    } else {
      socket.leave('undertale');
      socket.join('deepio');
    }
    socket.emit('switchMode', gameMode);
  }

  private getPlayerStates() {
    const playerStates: PlayerState[] = [];
    this.players.forEach((player) => {
      const playerState = player.getState();
      playerStates.push(playerState);
    });
    return playerStates;
  }

  private collide(rect1: Rect, angle1: number, rect2: Rect, angle2: number) {
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
        (_player, index) => index !== playerIndex
      );
      enemies.forEach((enemy) => {
        enemy.bullets.forEach((bullet, index) => {
          const collision = this.collide(
            bullet.rect,
            bullet.angle,
            player.rect,
            player.angle
          );
          if (collision) {
            enemy.removeBullet(index);
            enemy.chargeUp();
            player.takeDamage(enemy.username);
          }
        });
      });
    });
  }

  private getState(): State {
    const playerStates = this.getPlayerStates();
    const bulletsState: BulletState[] = this.getAllBulletStates();
    const state: State = { playerStates, bulletsState };
    return state;
  }

  private getSpecificPlayer(socketID: string) {
    const player = this.players.find((player) => player.socket.id == socketID);
    return player;
  }

  handleInput(keys: Keys, angle: number, socketID: string) {
    const player = this.getSpecificPlayer(socketID);
    if (player) {
      player.inputHandler.updateKeys(keys);
      player.angle = angle;
    }
  }
}

export default Game;
