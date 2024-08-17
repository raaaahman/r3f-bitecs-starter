import { createWorld, addEntity, addComponent, IWorld } from "bitecs";
import {
  TileComponent,
  PositionComponent,
  RotationComponent,
  ColorComponent,
  SpawnComponent,
} from "./components";
import { FlowComponent, POINT_OF_INTEREST } from "./components/FlowComponent";
import { GraphComponent } from "./components/GraphComponent";
import { LevelData } from "../types/LevelData";
import { WithBoundaries } from "../types";

export function createLevel(levelData: LevelData) {
  const world = createWorld({
    time: { delta: 0, elapsed: 0, then: performance.now() },
    size: {
      width: levelData.layers[0].tiles[0].length,
      height: levelData.layers[0].tiles.length,
    },
  });

  setTiles(levelData.layers, world);

  setGraph(levelData.edges, world);

  setCars(levelData.groups, world);

  setFlowMaps(levelData.groups, world);

  return world;
}

export function setCars(groups: LevelData["groups"], world: IWorld) {
  for (let i = 0; i < groups.length; i++) {
    const eid = addEntity(world);

    addComponent(world, PositionComponent, eid);
    PositionComponent.x[eid] = groups[i].start[0];
    PositionComponent.z[eid] = groups[i].start[1];

    addComponent(world, ColorComponent, eid);
    ColorComponent.team[eid] = groups[i].color;

    addComponent(world, SpawnComponent, eid);
    SpawnComponent.delay[eid] = groups[i].delay;
    SpawnComponent.max[eid] = groups[i].max;
    SpawnComponent.cooldown[eid] = 0;
  }
}

export function setFlowMaps(
  groups: LevelData["groups"],
  world: WithBoundaries<IWorld>
) {
  for (let i = 0; i < groups.length; i++) {
    for (let z = 0; z < world.size.height; z++) {
      for (let x = 0; x < world.size.width; x++) {
        const flowId = addEntity(world);

        addComponent(world, PositionComponent, flowId);
        PositionComponent.x[flowId] = x;
        PositionComponent.z[flowId] = z;

        addComponent(world, ColorComponent, flowId);
        ColorComponent.team[flowId] = groups[i].color;

        addComponent(world, FlowComponent, flowId);

        if (groups[i].end[0] === x && groups[i].end[1] === z) {
          FlowComponent.pointOfInterest[flowId] = POINT_OF_INTEREST.EXIT;
        }
      }
    }
  }
}

export function setTiles(layers: LevelData["layers"], world: IWorld) {
  for (let i = 0; i < layers.length; i++) {
    for (let z = 0; z < layers[i].tiles.length; z++) {
      for (let x = 0; x < layers[i].tiles[z].length; x++) {
        if (layers[i].tiles[z][x] < 0) continue;

        const eid = addEntity(world);

        addComponent(world, TileComponent, eid);
        TileComponent.id[eid] = layers[i].tiles[z][x];

        addComponent(world, PositionComponent, eid);
        PositionComponent.x[eid] = x;
        PositionComponent.z[eid] = z;

        addComponent(world, RotationComponent, eid);
        RotationComponent.y[eid] = layers[i].rotations[z][x];
      }
    }
  }
}

export function setGraph(edges: LevelData["edges"], world: IWorld) {
  for (let z = 0; z < edges.length; z++) {
    for (let x = 0; x < edges[z].length; x++) {
      const eid = addEntity(world);

      addComponent(world, PositionComponent, eid);
      PositionComponent.x[eid] = x;
      PositionComponent.z[eid] = z;

      addComponent(world, GraphComponent, eid);
      GraphComponent.edges[eid] = edges[z][x];
    }
  }
}
