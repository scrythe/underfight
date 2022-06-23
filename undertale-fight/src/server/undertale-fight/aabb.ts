import { Rect } from '../../shared/undertale-fight/rectangle';

function checkAABBCollision(rect1: Rect, rect2: Rect) {
  const xCollision = () => {
    return (
      rect1.topLeft.x < rect2.topRight.x && rect1.topRight.x > rect2.topLeft.x
    );
  };
  const yCollision = () => {
    return (
      rect1.topLeft.y < rect2.bottomLeft.y &&
      rect1.bottomLeft.y > rect2.topLeft.y
    );
  };
  return xCollision() && yCollision();
}

export default checkAABBCollision;
