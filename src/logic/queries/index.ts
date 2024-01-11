import { IWorld, defineQuery, enterQuery } from "bitecs";
import { PositionComponent, VelocityComponent } from "../components";

export const movementQuery = defineQuery([
  PositionComponent,
  VelocityComponent,
]);
export function enteredMovementQuery(world: IWorld) {
  return enterQuery(movementQuery)(world);
}
