import { Vector } from "../interfaces/Vector";

export function rotateVector(vector: Vector, angleDegrees: number) {
  const angle = (Math.PI / 180) * angleDegrees;

  const newVector: Vector = {
    x: vector.x * Math.cos(angle) - vector.y * Math.sin(angle),
    y: vector.x * Math.sin(angle) + vector.y * Math.cos(angle),
  };

  return newVector;
}
