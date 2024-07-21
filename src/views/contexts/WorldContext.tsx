import { PropsWithChildren, createContext } from "react";
import { WorldWithTime } from "../../types";
import { addComponent, addEntity, createWorld, pipe } from "bitecs";
import {
  ColorComponent,
  PositionComponent,
  RotationComponent,
  SpawnComponent,
  TileComponent,
} from "../../logic/components";
import { LevelData } from "../../types/LevelData";
import { useFrame } from "@react-three/fiber";
import { timeSystem } from "../../logic/systems/timeSystem";
import { spawnSystem } from "../../logic/systems/spawnSystem";

export const WorldContext = createContext<WorldWithTime | undefined>(undefined);

export function WorldContextProvider({
  children,
  levelData,
}: PropsWithChildren<{ levelData: LevelData }>) {
  const world = createWorld({
    time: { delta: 0, elapsed: 0, then: performance.now() },
  });

  // Add the starting entities in our world
  for (let i = 0; i < levelData.layers.length; i++) {
    for (let z = 0; z < levelData.layers[i].tiles.length; z++) {
      for (let x = 0; x < levelData.layers[i].tiles[z].length; x++) {
        if (levelData.layers[i].tiles[z][x] < 0) continue;

        const eid = addEntity(world);

        addComponent(world, TileComponent, eid);
        TileComponent.id[eid] = levelData.layers[i].tiles[z][x];

        addComponent(world, PositionComponent, eid);
        PositionComponent.x[eid] = x;
        PositionComponent.z[eid] = z;

        addComponent(world, RotationComponent, eid);
        RotationComponent.y[eid] = levelData.layers[i].rotations[z][x];
      }
    }
  }

  for (let i = 0; i < levelData.groups.length; i++) {
    const eid = addEntity(world);

    addComponent(world, PositionComponent, eid);
    PositionComponent.x[eid] = levelData.groups[i].start[0];
    PositionComponent.z[eid] = levelData.groups[i].start[1];

    addComponent(world, ColorComponent, eid);
    ColorComponent.team[eid] = levelData.groups[i].color;

    addComponent(world, SpawnComponent, eid);
    SpawnComponent.delay[eid] = levelData.groups[i].delay;
    SpawnComponent.max[eid] = levelData.groups[i].max;
    SpawnComponent.cooldown[eid] = 0;
  }

  const pipeline = pipe(timeSystem, spawnSystem);

  useFrame(() => {
    pipeline(world);
  });

  return (
    <WorldContext.Provider value={world}>{children}</WorldContext.Provider>
  );
}
