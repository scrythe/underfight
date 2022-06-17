import playerNormal from './assets/player.png';
import playerDamaged from './assets/player-damaged.png';
import bullet from './assets/bullet.png';

const assetsPaths = { playerNormal, playerDamaged, bullet };

class Images {
  private _playerNormal: HTMLImageElement;
  private _playerDamaged: HTMLImageElement;
  private _bullet: HTMLImageElement;
  constructor() {
    this._playerNormal = this.loadImage(assetsPaths.playerNormal);
    this._playerDamaged = this.loadImage(assetsPaths.playerDamaged);
    this._bullet = this.loadImage(assetsPaths.bullet);
  }

  private loadImage(path: string) {
    const image = new Image();
    image.src = path;
    return image;
  }

  static prelaodImage(path: string) {
    const image = new Image();
    image.src = path;
    return new Promise<void>((resolve) =>
      image.addEventListener('load', () => resolve())
    );
  }

  static preloadAssets() {
    return new Promise<void>(async (resolve) => {
      const assetsPathsValues: string[] = Object.values(assetsPaths);
      const preloadImages = assetsPathsValues.map((path) =>
        this.prelaodImage(path)
      );
      await Promise.all(preloadImages);
      resolve();
    });
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
