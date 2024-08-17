import { addComponent, addEntity, createWorld } from "bitecs";
import { describe, expect, it } from "vitest";
import {
  ColorComponent,
  PositionComponent,
  RotationComponent,
  SpeedComponent,
  VelocityComponent,
} from "../components";
import { FlowComponent } from "../components/FlowComponent";
import { DIRECTION } from "../components/GraphComponent";
import { steeringSystem } from "./steeringSystem";

describe("The steering system", () => {
  it.each([
    [0, 0, 0, 0, 0, DIRECTION.EAST, 1],
    [1, 0, 1, 0, 1, DIRECTION.SOUTH, 0],
    [0, 1.01, 1.99, 1, 2, DIRECTION.NORTH, 2],
    [1, 1.95, 3.02, 2, 3, DIRECTION.WEST, 3],
  ])(
    "should set the RotationComponent of the entity according to the FlowComponent",
    (team, carX, carZ, flowX, flowZ, direction, rotation) => {
      const world = createWorld();

      const carId = addEntity(world);
      addComponent(world, ColorComponent, carId);
      ColorComponent.team[carId] = team;
      addComponent(world, PositionComponent, carId);
      PositionComponent.x[carId] = carX;
      PositionComponent.z[carId] = carZ;
      addComponent(world, RotationComponent, carId);
      addComponent(world, VelocityComponent, carId);
      addComponent(world, SpeedComponent, carId);

      const flowId = addEntity(world);
      addComponent(world, ColorComponent, flowId);
      ColorComponent.team[flowId] = team;
      addComponent(world, PositionComponent, flowId);
      PositionComponent.x[flowId] = flowX;
      PositionComponent.z[flowId] = flowZ;
      addComponent(world, FlowComponent, flowId);
      FlowComponent.direction[flowId] = direction;

      steeringSystem(world);

      expect(RotationComponent.y[carId]).toEqual(rotation);
    }
  );
});
