import { defineQuery, enterQuery, exitQuery } from "bitecs";
import {
  ColorComponent,
  PositionComponent,
  RotationComponent,
  SpawnComponent,
  SpeedComponent,
  TileComponent,
  VelocityComponent,
} from "../components";
import { FlowComponent } from "../components/FlowComponent";
import { GraphComponent } from "../components/GraphComponent";

export const movementQuery = defineQuery([
  PositionComponent,
  RotationComponent,
  VelocityComponent,
  SpeedComponent,
]);

export const tilesQuery = defineQuery([
  PositionComponent,
  RotationComponent,
  TileComponent,
]);

export const graphQuery = defineQuery([PositionComponent, GraphComponent]);

export const flowQuery = defineQuery([
  ColorComponent,
  PositionComponent,
  FlowComponent,
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
