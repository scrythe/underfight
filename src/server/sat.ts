import { RotatedRectangle, Vector, Position, DotMinMax } from './interfaces';

function checkSatCollision(rect1: RotatedRectangle, rect2: RotatedRectangle) {
  const allPerPenDicularVectors: Vector[] = [
    ...Object.values(rect1.perpendicularVectors),
    ...Object.values(rect2.perpendicularVectors),
  ];

  const Rect1Vertices: Position[] = Object.values(rect1.vertices);

  const Rect2Vertices: Position[] = Object.values(rect2.vertices);

  for (let index = 0; index < allPerPenDicularVectors.length; index++) {
    const vector = allPerPenDicularVectors[index];

    const dotProductsA = getDotProducts(vector, Rect1Vertices);
    const dotA = getMinAndMaxDotProduct(dotProductsA);

    const dotProductsB = getDotProducts(vector, Rect2Vertices);
    const dotB = getMinAndMaxDotProduct(dotProductsB);

    if (dotA.min < dotB.max && dotA.max > dotB.min) continue;
    // no collision, return instant false
    return false;
  }
  // no gap -> collision
  return true;
}

function getDotProducts(vector: Vector, vertices: Position[]) {
  const dotProducts: number[] = [];
  vertices.forEach((vertex) => {
    const dot = vector.x * vertex.x + vector.y * vertex.y;
    dotProducts.push(dot);
  });
  return dotProducts;
}

function getMinAndMaxDotProduct(dotProducts: number[]): DotMinMax {
  const max = Math.max(...dotProducts);
  const min = Math.min(...dotProducts);
  return { max, min };
}

export default checkSatCollision;
