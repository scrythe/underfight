import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload,
    create,
    update,
  },
};

function preload() {}
function create() {}
function update() {}

const game = new Phaser.Game(config);
