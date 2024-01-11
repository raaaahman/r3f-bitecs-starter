import { useContext } from "react";
import { WorldContext } from "../contexts/WorldContext";

export function useWorld() {
  const world = useContext(WorldContext);

  if (!world)
    throw new Error("useWorld hook MUST be used inside a WorldContextProvider");

  return world;
}
