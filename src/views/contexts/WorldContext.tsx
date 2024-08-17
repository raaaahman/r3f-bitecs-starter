import { PropsWithChildren, createContext } from "react";
import { CustomWorld } from "../../types";
import { pipe } from "bitecs";
import { LevelData } from "../../types/LevelData";
import { useFrame } from "@react-three/fiber";
import { timeSystem } from "../../logic/systems/timeSystem";
import { spawnSystem } from "../../logic/systems/spawnSystem";
import { movementSystem } from "../../logic/systems/movementSystem";
import { pathfindingSystem } from "../../logic/systems/pathfindingSystem";
import { createLevel } from "../../logic/createLevel";
import { steeringSystem } from "../../logic/systems/steeringSystem";

export const WorldContext = createContext<CustomWorld | undefined>(undefined);

export function WorldContextProvider({
  children,
  levelData,
}: PropsWithChildren<{ levelData: LevelData }>) {
  const world = createLevel(levelData);

  pathfindingSystem(world);

  const pipeline = pipe(
    timeSystem,
    spawnSystem,
    steeringSystem,
    movementSystem
  );

  useFrame(() => {
    pipeline(world);
  });

  return (
    <WorldContext.Provider value={world}>{children}</WorldContext.Provider>
  );
}


