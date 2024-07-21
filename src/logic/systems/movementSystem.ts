import { defineSystem } from "bitecs";
import { movementQuery } from "../queries";
import { PositionComponent, VelocityComponent } from "../components";
import { WorldWithTime } from "../../types";

export const movementSystem = defineSystem((world: WorldWithTime) => {
  const movingEntities = movementQuery(world);

  movingEntities.forEach((eid) => {
    PositionComponent.x[eid] +=
      (VelocityComponent.x[eid] * world.time.delta) / 1000;
    PositionComponent.y[eid] +=
      (VelocityComponent.y[eid] * world.time.delta) / 1000;
    PositionComponent.z[eid] +=
      (VelocityComponent.z[eid] * world.time.delta) / 1000;
  });

  return world;
});
