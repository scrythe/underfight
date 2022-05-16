import { VerticesRect, Corners } from './interfaces';

function getHitbox(vertices: VerticesRect): Corners {
  const corners = Object.values(vertices);
  const xCoords = corners.map((corner) => corner.x);
  const yCoords = corners.map((corner) => corner.y);

  const xMax = Math.max(...xCoords);
  const xMin = Math.min(...xCoords);
  const yMax = Math.max(...yCoords);
  const yMin = Math.min(...yCoords);

  const topLeft = { x: xMin, y: yMin };
  const topRight = { x: xMax, y: yMin };
  const bottomRight = { x: xMax, y: yMax };
  const bottomLeft = { x: xMin, y: yMax };

  return { topLeft, topRight, bottomRight, bottomLeft };
}

export default getHitbox;
