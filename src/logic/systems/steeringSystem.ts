import { defineSystem, IWorld } from "bitecs";
import { flowQuery, movementQuery } from "../queries";
import {
  ColorComponent,
  PositionComponent,
  RotationComponent,
} from "../components";
import { FlowComponent } from "../components/FlowComponent";

export const steeringSystem = defineSystem((world: IWorld) => {
  const moving = movementQuery(world);
  const flowMaps = flowQuery(world);

  for (const movingId of moving) {
    const currentFlow = flowMaps.find(
      (flowId) =>
        ColorComponent.team[movingId] === ColorComponent.team[flowId] &&
        Math.round(PositionComponent.x[movingId] * 10) ===
          PositionComponent.x[flowId] * 10 &&
        Math.round(PositionComponent.z[movingId] * 10) ===
          PositionComponent.z[flowId] * 10
    );

    if (typeof currentFlow === "number")
      RotationComponent.y[movingId] = Math.log2(
        FlowComponent.direction[currentFlow]
      );
  }

  return world;
});
