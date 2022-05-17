import playerNormal from './assets/player.png';
import playerDamaged from './assets/player-damaged.png';
import bullet from './assets/bullet.png';

class Images {
  private _playerNormal: HTMLImageElement;
  private _playerDamaged: HTMLImageElement;
  private _bullet: HTMLImageElement;
  constructor() {
    this._playerNormal = this.loadImage(playerNormal);
    this._playerDamaged = this.loadImage(playerDamaged);
    this._bullet = this.loadImage(bullet);
  }

  private loadImage(path: string) {
    const image = new Image();
    image.src = path;
    return image;
  }

  get playerNormal() {
    return this._playerNormal;
  }

  get playerDamaged() {
    return this._playerDamaged;
  }

  get bullet() {
    return this._bullet;
  }
}

export default Images;
