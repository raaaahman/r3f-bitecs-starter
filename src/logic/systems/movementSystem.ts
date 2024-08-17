import { defineSystem } from "bitecs";
import { movementQuery } from "../queries";
import {
  PositionComponent,
  RotationComponent,
  SpeedComponent,
  VelocityComponent,
} from "../components";
import { CustomWorld } from "../../types";

export const movementSystem = defineSystem((world: CustomWorld) => {
  const movingEntities = movementQuery(world);

  movingEntities.forEach((eid) => {
    VelocityComponent.x[eid] =
      Math.sin((Math.PI * RotationComponent.y[eid]) / 2) *
      SpeedComponent.maxSpeed[eid];
    VelocityComponent.z[eid] =
      Math.cos((Math.PI * RotationComponent.y[eid]) / 2) *
      SpeedComponent.maxSpeed[eid];

    PositionComponent.x[eid] +=
      (VelocityComponent.x[eid] * world.time.delta) / 1000;
    PositionComponent.y[eid] +=
      (VelocityComponent.y[eid] * world.time.delta) / 1000;
    PositionComponent.z[eid] +=
      (VelocityComponent.z[eid] * world.time.delta) / 1000;
  });

  return world;
});
