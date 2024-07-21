import { Vector2Tuple } from "three";

export type LevelData = {
  layers: { tiles: number[][]; rotations: number[][] }[];
  groups: {
    color: number;
    start: Vector2Tuple;
    delay: number;
    max: number;
    end: Vector2Tuple;
  }[];
};
