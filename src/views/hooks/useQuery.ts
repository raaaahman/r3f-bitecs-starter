import { Query } from "bitecs";
import { useWorld } from "./useWorld";

/**
 * Returns entities matching a Query passed as argument.
 *
 * @param {Query} query
 */
export function useQuery(query: Query) {
  const world = useWorld();

  return query(world);
}
