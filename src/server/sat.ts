import { PolygonType, Position } from './interfaces';

function createLine(x: number, y: number): Position {
  return { x, y };
}

function collisionDetection(polygonA: PolygonType, polygonB: PolygonType) {
  //TODO copied rest of code for testing
  //   var perpendicularLine = null;
  //   var dot = 0;
  //   var perpendicularStack = [];
  //   var amin = null;
  //   var amax = null;
  //   var bmin = null;
  //   var bmax = null;
  //   //Work out all perpendicular vectors on each edge for polygonA
  //   for (var i = 0; i < polygonA.edges.length; i++) {
  //     perpendicularLine = createLine(-polygonA.edges[i].y, polygonA.edges[i].x);
  //     perpendicularStack.push(perpendicularLine);
  //   }
  //   //Work out all perpendicular vectors on each edge for polygonB
  //   for (var i = 0; i < polygonB.edges.length; i++) {
  //     perpendicularLine = createLine(-polygonB.edges[i].y, polygonB.edges[i].x);
  //     perpendicularStack.push(perpendicularLine);
  //   }
  //   //Loop through each perpendicular vector for both polygons
  //   for (var i = 0; i < perpendicularStack.length; i++) {
  //     //These dot products will return different values each time
  //     amin = null;
  //     amax = null;
  //     bmin = null;
  //     bmax = null;
  //     /*Work out all of the dot products for all of the vertices in PolygonA against the perpendicular vector
  //      that is currently being looped through*/
  //     for (var j = 0; j < polygonA.vertices.length; j++) {
  //       dot =
  //         polygonA.vertices[j].x * perpendicularStack[i].x +
  //         polygonA.vertices[j].y * perpendicularStack[i].y;
  //       //Then find the dot products with the highest and lowest values from polygonA.
  //       if (amax === null || dot > amax) {
  //         amax = dot;
  //       }
  //       if (amin === null || dot < amin) {
  //         amin = dot;
  //       }
  //     }
  //     /*Work out all of the dot products for all of the vertices in PolygonB against the perpendicular vector
  //      that is currently being looped through*/
  //     for (var j = 0; j < polygonB.vertices.length; j++) {
  //       dot =
  //         polygonB.vertices[j].x * perpendicularStack[i].x +
  //         polygonB.vertices[j].y * perpendicularStack[i].y;
  //       //Then find the dot products with the highest and lowest values from polygonB.
  //       if (bmax === null || dot > bmax) {
  //         bmax = dot;
  //       }
  //       if (bmin === null || dot < bmin) {
  //         bmin = dot;
  //       }
  //     }
  //     //If there is no gap between the dot products projection then we will continue onto evaluating the next perpendicular edge.
  //     if ((amin! < bmax! && amin! > bmin!) || (bmin! < amax! && bmin! > amin!)) {
  //       continue;
  //     }
  //     //Otherwise, we know that there is no collision for definite.
  //     else {
  //       return false;
  //     }
  //   }
  //   /*If we have gotten this far. Where we have looped through all of the perpendicular edges and not a single one of there projections had
  // a gap in them. Then we know that the 2 polygons are colliding for definite then.*/
  //   return true;
  return false;
}

export default collisionDetection;
