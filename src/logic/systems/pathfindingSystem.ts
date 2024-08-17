import { defineSystem, IWorld } from "bitecs";
import { WithBoundaries } from "../../types";
import { flowQuery, graphQuery } from "../queries";
import { ColorComponent, PositionComponent } from "../components";
import { FlowComponent, POINT_OF_INTEREST } from "../components/FlowComponent";
import { DIRECTION, GraphComponent } from "../components/GraphComponent";

export const pathfindingSystem = defineSystem(
  (world: WithBoundaries<IWorld>) => {
    const nodeEntities = graphQuery(world);
    const flowEntities = flowQuery(world);

    const exitEntities = flowEntities.filter(
      (eid) => FlowComponent.pointOfInterest[eid] === POINT_OF_INTEREST.EXIT
    );

    for (const exitId of exitEntities) {
      const teamFlow = flowEntities.filter(
        (eid) => ColorComponent.team[eid] === ColorComponent.team[exitId]
      );

      const nodeId = nodeEntities.find(
        (eid) =>
          PositionComponent.x[eid] === PositionComponent.x[exitId] &&
          PositionComponent.z[eid] === PositionComponent.z[exitId]
      );

      if (typeof nodeId !== "number") continue;

      const frontier: number[] = [nodeId];
      const reached: number[] = [];

      while (frontier.length > 0) {
        const current = frontier.pop()!;
        for (const next of neighbors(current, nodeEntities)) {
          if (!reached.includes(next)) {
            const flow = teamFlow.find(
              (eid) =>
                PositionComponent.x[eid] === PositionComponent.x[next] &&
                PositionComponent.z[eid] === PositionComponent.z[next]
            )!;

            if (
              PositionComponent.x[next] === PositionComponent.x[current] &&
              PositionComponent.z[next] === PositionComponent.z[current] + 1
            ) {
              FlowComponent.direction[flow] = DIRECTION.NORTH;
            }
            if (
              PositionComponent.x[next] === PositionComponent.x[current] + 1 &&
              PositionComponent.z[next] === PositionComponent.z[current]
            ) {
              FlowComponent.direction[flow] = DIRECTION.WEST;
            }
            if (
              PositionComponent.x[next] === PositionComponent.x[current] &&
              PositionComponent.z[next] === PositionComponent.z[current] - 1
            ) {
              FlowComponent.direction[flow] = DIRECTION.SOUTH;
            }
            if (
              PositionComponent.x[next] === PositionComponent.x[current] - 1 &&
              PositionComponent.z[next] === PositionComponent.z[current]
            ) {
              FlowComponent.direction[flow] = DIRECTION.EAST;
            }

            frontier.push(next);
            reached.push(next);
          }
        }
      }
    }

    return world;
  }
);

export function neighbors(eid: number, nodes: number[]) {
  const result = [];

  const south = nodes.find(
    (node) =>
      PositionComponent.x[node] === PositionComponent.x[eid] &&
      PositionComponent.z[node] === PositionComponent.z[eid] + 1
  );
  if (
    typeof south === "number" &&
    GraphComponent.edges[eid] & DIRECTION.SOUTH &&
    GraphComponent.edges[south] & DIRECTION.NORTH
  ) {
    result.push(south);
  }

  const east = nodes.find(
    (node) =>
      PositionComponent.x[node] === PositionComponent.x[eid] + 1 &&
      PositionComponent.z[node] === PositionComponent.z[eid]
  );
  if (
    typeof east === "number" &&
    GraphComponent.edges[eid] & DIRECTION.EAST &&
    GraphComponent.edges[east] & DIRECTION.WEST
  ) {
    result.push(east);
  }

  const north = nodes.find(
    (node) =>
      PositionComponent.x[node] === PositionComponent.x[eid] &&
      PositionComponent.z[node] === PositionComponent.z[eid] - 1
  );
  if (
    typeof north === "number" &&
    GraphComponent.edges[eid] & DIRECTION.NORTH &&
    GraphComponent.edges[north] & DIRECTION.SOUTH
  ) {
    result.push(north);
  }

  const west = nodes.find(
    (node) =>
      PositionComponent.x[node] === PositionComponent.x[eid] - 1 &&
      PositionComponent.z[node] === PositionComponent.z[eid]
  );
  if (
    typeof west === "number" &&
    GraphComponent.edges[eid] & DIRECTION.WEST &&
    GraphComponent.edges[west] & DIRECTION.EAST
  ) {
    result.push(west);
  }

  return result;
}
