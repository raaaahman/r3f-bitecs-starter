import { defineQuery, enterQuery, exitQuery } from "bitecs";
import {
  ColorComponent,
  PositionComponent,
  RotationComponent,
  SpawnComponent,
  TileComponent,
  VelocityComponent,
} from "../components";

export const movementQuery = defineQuery([
  PositionComponent,
  RotationComponent,
  VelocityComponent,
]);

export const displayQuery = defineQuery([PositionComponent]);

export const tilesQuery = defineQuery([
  PositionComponent,
  RotationComponent,
  TileComponent,
]);

export const spawnQuery = defineQuery([
  PositionComponent,
  ColorComponent,
  SpawnComponent,
]);

export const enterSpawnQuery = enterQuery(spawnQuery);

export const carsQuery = defineQuery([
  PositionComponent,
  RotationComponent,
  ColorComponent,
]);

export const enterCarsQuery = enterQuery(carsQuery);

export const exitCarsQuery = exitQuery(carsQuery);
