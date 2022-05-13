import player from './assets/player.png';
import bullet from './assets/bullet.png';

class Images {
  private _player: HTMLImageElement;
  private _bullet: HTMLImageElement;
  constructor() {
    this._player = this.loadImage(player);
    this._bullet = this.loadImage(bullet);
  }

  private loadImage(path: string) {
    const image = new Image();
    image.src = path;
    return image;
  }

  get player() {
    return this._player;
  }

  get bullet() {
    return this._bullet;
  }
}

export default Images;
