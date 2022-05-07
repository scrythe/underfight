import Phaser from 'phaser';
import GameScene from './game';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  scene: [GameScene],
};

const game: Phaser.Game = new Phaser.Game(config);

