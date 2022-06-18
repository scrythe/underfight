import { RedHeart, BlueHeart } from './hearts';
import { PlayerState } from '../shared/stateInterface';
import { HeartMap } from '../shared/interface';

const heartMap: HeartMap<RedHeart, BlueHeart> = {
  RedHeart: new RedHeart(),
  BlueHeart: new BlueHeart(),
};

class Player {
  draw(ctx: CanvasRenderingContext2D, playerState: PlayerState) {
    const heart = heartMap[playerState.heartType];
    heart.draw(ctx, playerState.playerPos);
  }
}

export default Player;
