import { Vector } from "../interfaces/Vector";

export function getVectorSize(vector: Vector) {
  return Math.sqrt(vector.x ** 2 + vector.y ** 2);
}
