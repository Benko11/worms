import { Controls } from "./Controls";
import { Vector } from "./Vector";

type Position = Vector;
export interface Player {
  name: string;
  pos: Position;
  direction: Vector;
  controls: Controls;
}
