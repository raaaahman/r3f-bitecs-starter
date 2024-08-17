import { addComponent, addEntity, createWorld } from "bitecs";
import { describe, it, expect } from "vitest";
import { neighbors, pathfindingSystem } from "./pathfindingSystem";
import { DIRECTION, GraphComponent } from "../components/GraphComponent";
import { PositionComponent } from "../components";
import { flowQuery, graphQuery } from "../queries";
import { setFlowMaps, setGraph } from "../createLevel";
import { FlowComponent } from "../components/FlowComponent";

describe("The neighbors() function", () => {
  it("should return no neighbors if the given node has no edges", () => {
    const world = createWorld({
      size: { width: 2, height: 2 },
    });

    let target = 0;

    for (let z = 0; z < world.size.height; z++) {
      for (let x = 0; x < world.size.width; x++) {
        const eid = addEntity(world);

        addComponent(world, GraphComponent, eid);

        addComponent(world, PositionComponent, eid);
        PositionComponent.x[eid] = x;
        PositionComponent.z[eid] = z;

        if (z === 0 && x === 0) target = eid;
      }
    }

    const nodes = graphQuery(world);

    const result = neighbors(target, nodes);

    expect(result).toHaveLength(0);
  });

  it.each([
    ["south", [1, 2], DIRECTION.SOUTH, DIRECTION.NORTH],
    ["south", [1, 2], DIRECTION.SOUTH, DIRECTION.NORTH | DIRECTION.WEST],
    ["south", [1, 2], DIRECTION.SOUTH | DIRECTION.EAST, DIRECTION.NORTH],
    ["east", [2, 1], DIRECTION.EAST, DIRECTION.WEST],
    ["east", [2, 1], DIRECTION.EAST, DIRECTION.WEST | DIRECTION.EAST],
    ["east", [2, 1], DIRECTION.EAST | DIRECTION.NORTH, DIRECTION.WEST],
    ["north", [1, 0], DIRECTION.NORTH, DIRECTION.SOUTH],
    ["north", [1, 0], DIRECTION.NORTH, DIRECTION.SOUTH | DIRECTION.NORTH],
    ["north", [1, 0], DIRECTION.NORTH | DIRECTION.WEST, DIRECTION.SOUTH],
    ["west", [0, 1], DIRECTION.WEST, DIRECTION.EAST],
    ["west", [0, 1], DIRECTION.WEST, DIRECTION.EAST | DIRECTION.SOUTH],
    ["west", [0, 1], DIRECTION.WEST | DIRECTION.SOUTH, DIRECTION.EAST],
  ])(
    "should return a neighbor to the %s if target has an edge to %s and neighbor has an edge to the target",
    (_, direction, targetEdges, neighborEdges) => {
      const world = createWorld({
        size: { width: 3, height: 3 },
      });

      let target = 0;

      for (let z = 0; z < world.size.height; z++) {
        for (let x = 0; x < world.size.width; x++) {
          const eid = addEntity(world);

          addComponent(world, GraphComponent, eid);

          if (z === 1 && x === 1) {
            target = eid;
            GraphComponent.edges[eid] = targetEdges;
          }

          if (z === direction[1] && x === direction[0]) {
            GraphComponent.edges[eid] = neighborEdges;
          }

          addComponent(world, PositionComponent, eid);
          PositionComponent.x[eid] = x;
          PositionComponent.z[eid] = z;
        }
      }

      const nodes = graphQuery(world);

      const result = neighbors(target, nodes);

      expect(result).toHaveLength(1);
      expect(PositionComponent.x[result[0]]).toEqual(direction[0]);
      expect(PositionComponent.z[result[0]]).toEqual(direction[1]);
    }
  );
});

describe("The pathfinding system", () => {
  it("should set the neighbor flow towards the given exit if neighbor and exit tiles have an edge", () => {
    const world = createWorld({ size: { width: 2, height: 2 } });
    setGraph(
      [
        [DIRECTION.SOUTH | DIRECTION.EAST, DIRECTION.WEST | DIRECTION.SOUTH],
        [DIRECTION.NORTH | DIRECTION.EAST, DIRECTION.WEST | DIRECTION.NORTH],
      ],
      world
    );
    setFlowMaps(
      [{ color: 0, start: [0, 1], end: [1, 0], delay: 1000, max: 10 }],
      world
    );

    pathfindingSystem(world);

    const flowmap = flowQuery(world);
    expect(flowmap).toHaveLength(4);
    const southNeighbor = flowmap.find(
      (eid) => PositionComponent.x[eid] === 1 && PositionComponent.z[eid] === 1
    );
    expect(southNeighbor).toBeTypeOf("number");
    expect(FlowComponent.direction[southNeighbor as number]).toEqual(
      DIRECTION.NORTH
    );
    const westNeighbor = flowmap.find(
      (eid) => PositionComponent.x[eid] === 0 && PositionComponent.z[eid] === 0
    );
    expect(westNeighbor).toBeTypeOf("number");
    expect(FlowComponent.direction[westNeighbor as number]).toEqual(
      DIRECTION.EAST
    );
  });
});
