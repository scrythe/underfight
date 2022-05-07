import Phaser from 'phaser';

const DUDE_KEY = 'dude';

class GameScene extends Phaser.Scene {
  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  constructor() {
    super('GameScene');
  }
  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.spritesheet(DUDE_KEY, 'assets/player.png', { frameWidth: 100, frameHeight: 100 });
  }
  create() {
    this.add.image(400, 300, 'sky');
    this.createPlayer();
  }

  createPlayer() {
    this.player = this.physics.add.sprite(100, 450, DUDE_KEY);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
  }
  update() {}
}

export default GameScene;
