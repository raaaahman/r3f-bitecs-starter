import { IWorld } from "bitecs";
import { movementQuery } from "../queries";
import { Vector3 } from "three";
import { PositionComponent, VelocityComponent } from "../components";
import { enteredMovementQuery } from "../queries";

// Use two ThreeJs Vector3 as proxies, since the vector maths is already done.
// Reuse the a single instance for each of our components, to save on memory.
const PositionProxy = new Vector3();
const VelocityProxy = new Vector3();

export function movementSystem(world: IWorld) {
  // Gives a random position and velocity to each new entity
  enteredMovementQuery(world).forEach((eid) => {
    setStartingPosition(eid);
  });

  // Updates position of each existing entity according to its velocity.
  movementQuery(world).forEach((eid) => {
    // Reinitialize entities that have gone too far behind the camera
    if (PositionComponent.z[eid] >= 0) setStartingPosition(eid);

    PositionProxy.set(
      PositionComponent.x[eid],
      PositionComponent.y[eid],
      PositionComponent.z[eid]
    );
    VelocityProxy.set(
      VelocityComponent.x[eid],
      VelocityComponent.y[eid],
      VelocityComponent.z[eid]
    );
    PositionProxy.add(VelocityProxy);
    PositionComponent.x[eid] = PositionProxy.x;
    PositionComponent.y[eid] = PositionProxy.y;
    PositionComponent.z[eid] = PositionProxy.z;
  });

  return world;
}

function setStartingPosition(eid: number) {
  PositionComponent.x[eid] = Math.random() * 42 - 21;
  PositionComponent.y[eid] = Math.random() * 36 - 18;
  PositionComponent.z[eid] = -32 - Math.random() * 64;

  VelocityComponent.x[eid] = 0;
  VelocityComponent.y[eid] = 0;
  VelocityComponent.z[eid] = 0.75 + Math.random() * 0.25;
}
