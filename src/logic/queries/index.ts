import { defineQuery } from "bitecs";
import {
  PositionComponent,
  RotationComponent,
  TileComponent,
  VelocityComponent,
} from "../components";

export const movementQuery = defineQuery([
  PositionComponent,
  VelocityComponent,
]);

export const displayQuery = defineQuery([PositionComponent]);

export const tilesQuery = defineQuery([
  PositionComponent,
  RotationComponent,
  TileComponent,
]);
