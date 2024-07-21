import { defineSystem } from "bitecs";
import { WorldWithTime } from "../../types";

export const timeSystem = defineSystem((world: WorldWithTime) => {
  const { time } = world;
  const now = performance.now();
  const delta = now - time.then;
  time.delta = delta;
  time.elapsed += delta;
  time.then = now;
  return world;
});
