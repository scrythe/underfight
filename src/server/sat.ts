import { RotatedRectangle, Vector, Position } from './interfaces';

function checkSatCollision(rect1: RotatedRectangle, rect2: RotatedRectangle) {
  const allPerPenDicularVectors: Vector[] = [];

  const Rect1PerpendicularVectors: Vector[] = Object.values(
    rect1.perpendicularVectors
  );

  const Rect2PerpendicularVectors: Vector[] = Object.values(
    rect2.perpendicularVectors
  );

  allPerPenDicularVectors.push(...Rect1PerpendicularVectors);
  allPerPenDicularVectors.push(...Rect2PerpendicularVectors);

  const Rect1Vertices: Position[] = Object.values(rect1.vertices);

  const Rect2Vertices: Position[] = Object.values(rect2.vertices);

  for (let index = 0; index < allPerPenDicularVectors.length; index++) {
    const vector = allPerPenDicularVectors[index];
    const dotProductsA = getDotProducts(vector, Rect1Vertices);
    const dotA = getMinAndMaxDotProduct(dotProductsA);

    const dotProductsB = getDotProducts(vector, Rect2Vertices);
    const dotB = getMinAndMaxDotProduct(dotProductsB);

    if (
      (dotA.min < dotB.max && dotA.min > dotB.min) ||
      (dotB.min < dotA.max && dotB.min > dotA.min)
    ) {
      continue;
    } else {
      // No Collision
      return false;
    }
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

function getMinAndMaxDotProduct(dotProducts: number[]) {
  const max = Math.max(...dotProducts);
  const min = Math.min(...dotProducts);
  return { max, min };
}

export default checkSatCollision;
