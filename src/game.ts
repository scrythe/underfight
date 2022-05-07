import Phaser from 'phaser';

const SKY_KEY = 'sky';
const PLAYER_KEY = 'dude';
const ENEMY_KEY = 'enemy';
const SPEED = 160;

class GameScene extends Phaser.Scene {
  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  enemy!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image(SKY_KEY, 'assets/sky.png');
    this.load.spritesheet(PLAYER_KEY, 'assets/player.png', {
      frameWidth: 100,
      frameHeight: 100,
    });
    this.load.spritesheet(ENEMY_KEY, 'assets/enemy.png', {
      frameWidth: 100,
      frameHeight: 100,
    });
  }

  create() {
    this.add.image(400, 300, SKY_KEY);
    this.enemy = this.createEnemy();
    this.player = this.createPlayer();

    this.physics.add.overlap(
      this.player,
      this.enemy,
      this.gotShot,
      () => {},
      this
    );

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createPlayer() {
    const player = this.physics.add.sprite(100, 450, PLAYER_KEY);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    return player;
  }

  createEnemy() {
    const enemy = this.physics.add.sprite(500, 400, ENEMY_KEY);
    return enemy;
  }

  gotShot(
    player: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody
  ) {
    console.log('damage');
  }

  update() {
    this.moveLeftOrRight();
    this.moveUpOrDown();
  }

  moveLeftOrRight() {
    if (this.cursors.left.isDown) this.player.setVelocityX(-SPEED);
    else if (this.cursors.right.isDown) this.player.setVelocityX(SPEED);
    else this.player.setVelocityX(0);
  }

  moveUpOrDown() {
    if (this.cursors.up.isDown) this.player.setVelocityY(-SPEED);
    else if (this.cursors.down.isDown) this.player.setVelocityY(SPEED);
    else this.player.setVelocityY(0);
  }
}

export default GameScene;
