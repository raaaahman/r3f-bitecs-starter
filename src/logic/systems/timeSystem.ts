import { defineSystem, IWorld } from "bitecs";
import { WithTime } from "../../types";

export const timeSystem = defineSystem((world: WithTime<IWorld>) => {
  const { time } = world;
  const now = performance.now();
  const delta = now - time.then;
  time.delta = delta;
  time.elapsed += delta;
  time.then = now;
  return world;
});
