import { Corners } from './interfaces';

function checkAABBCollision(verticesRect1: Corners, verticesRect2: Corners) {
  const xCollision = () => {
    return (
      verticesRect1.topLeft.x < verticesRect2.topRight.x &&
      verticesRect1.topRight.x > verticesRect2.topLeft.x
    );
  };
  const yCollision = () => {
    return (
      verticesRect1.topLeft.y < verticesRect2.bottomLeft.y &&
      verticesRect1.bottomLeft.y > verticesRect2.topLeft.y
    );
  };
  return xCollision() && yCollision();
}

export default checkAABBCollision;
