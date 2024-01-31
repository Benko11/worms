import { Vector } from "../interfaces/Vector";

export function getRandomVector(): Vector {
  const angle = Math.random() * 2 * Math.PI;
  return {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
}
