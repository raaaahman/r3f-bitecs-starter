import { PropsWithChildren, createContext } from "react";
import { WorldWithTime } from "../../types";
import { addComponent, addEntity, createWorld } from "bitecs";
import {
  PositionComponent,
  RotationComponent,
  TileComponent,
} from "../../logic/components";
import { LevelData } from "../../types/LevelData";

export const WorldContext = createContext<WorldWithTime | undefined>(undefined);

export function WorldContextProvider({
  children,
  levelData,
}: PropsWithChildren<{ levelData: LevelData }>) {
  const world = createWorld({ time: { delta: 0, elapsed: 0 } });

  // Add the starting entities in our world
  for (let i = 0; i < levelData.layers.length; i++) {
    for (let z = 0; z < levelData.layers[i].tiles.length; z++) {
      for (let x = 0; x < levelData.layers[i].tiles[z].length; x++) {
        if (levelData.layers[i].tiles[z][x] < 0) continue;

        const eid = addEntity(world);

        addComponent(world, TileComponent, eid);
        TileComponent.id[eid] = levelData.layers[i].tiles[z][x];

        addComponent(world, PositionComponent, eid);
        PositionComponent.x[eid] = x - levelData.layers[i].tiles[z].length / 2;
        PositionComponent.z[eid] = z - levelData.layers[i].tiles.length / 2;

        addComponent(world, RotationComponent, eid);
        RotationComponent.z[eid] = levelData.layers[i].rotations[z][x];
      }
    }
  }

  return (
    <WorldContext.Provider value={world}>{children}</WorldContext.Provider>
  );
}
