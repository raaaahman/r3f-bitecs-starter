import { addComponent, addEntity, defineSystem, removeEntity } from "bitecs";
import { carsQuery, spawnQuery } from "../queries";
import {
  ColorComponent,
  PositionComponent,
  RotationComponent,
  SpawnComponent,
  VelocityComponent,
} from "../components";
import { WorldWithTime } from "../../types";

export const spawnSystem = defineSystem((world: WorldWithTime) => {
  const spawnPoints = spawnQuery(world);

  for (const spawnId of spawnPoints) {
    SpawnComponent.cooldown[spawnId] -= world.time.delta;

    const cars = carsQuery(world);

    if (
      SpawnComponent.cooldown[spawnId] <= 0 &&
      cars.length < SpawnComponent.max[spawnId]
    ) {
      const eid = addEntity(world);

      addComponent(world, PositionComponent, eid);
      PositionComponent.x[eid] = PositionComponent.x[spawnId];
      PositionComponent.y[eid] = PositionComponent.y[spawnId];
      PositionComponent.z[eid] = PositionComponent.z[spawnId];

      addComponent(world, RotationComponent, eid);
      RotationComponent.z[eid] = Math.floor(Math.random() * 4);

      addComponent(world, ColorComponent, eid);
      ColorComponent.team[eid] = ColorComponent.team[spawnId];

      addComponent(world, VelocityComponent, eid);

      SpawnComponent.cooldown[spawnId] += SpawnComponent.delay[spawnId];
    }

    if (
      SpawnComponent.cooldown[spawnId] <= 0 &&
      cars.length === SpawnComponent.max[spawnId]
    ) {
      const eid = cars[Math.floor(Math.random() * cars.length)];

      removeEntity(world, eid);

      SpawnComponent.cooldown[spawnId] += SpawnComponent.delay[spawnId];
    }
  }

  return world;
});
