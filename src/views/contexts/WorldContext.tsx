import { PropsWithChildren, createContext } from "react";
import { WorldWithTime } from "../../types";
import { addComponent, addEntity, createWorld } from "bitecs";
import {
  ColorComponent,
  PositionComponent,
  VelocityComponent,
} from "../../logic/components";

export const WorldContext = createContext<WorldWithTime | undefined>(undefined);

export function WorldContextProvider({ children }: PropsWithChildren) {
  const world = createWorld({ time: { delta: 0, elapsed: 0 } });

  // Add the starting entities in our world
  for (let i = 0; i < 32; i++) {
    const eid = addEntity(world);
    addComponent(world, PositionComponent, eid);
    addComponent(world, VelocityComponent, eid);
    addComponent(world, ColorComponent, eid);
    // Set a random starting color
    ColorComponent.r[eid] = Math.round(Math.random() * 255);
    ColorComponent.g[eid] = Math.round(Math.random() * 255);
    ColorComponent.b[eid] = Math.round(Math.random() * 255);
  }

  return (
    <WorldContext.Provider value={world}>{children}</WorldContext.Provider>
  );
}
