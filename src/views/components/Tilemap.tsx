import { useFrame, useLoader } from "@react-three/fiber";
import {
  PositionComponent,
  RotationComponent,
  TileComponent,
} from "../../logic/components";
import { tilesQuery } from "../../logic/queries";
import { useQuery } from "../hooks/useQuery";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

import { Clone } from "@react-three/drei";
import { ComponentProps, useRef, useState } from "react";
import { Vector2Tuple } from "three";

export function Tilemap({ ...props }: ComponentProps<"group">) {
  const tiles = useQuery(tilesQuery);

  const tileset = useLoader(GLTFLoader, "/models/road_tileset.glb");

  const commandsQueue = useRef<Vector2Tuple[]>([]);

  const [updated, forceUpdate] = useState(false);

  useFrame(() => {
    while (commandsQueue.current.length > 0) {
      const position = commandsQueue.current.pop() as Vector2Tuple;

      tiles.forEach((eid) => {
        if (
          PositionComponent.x[eid] === position[0] &&
          PositionComponent.z[eid] === position[1]
        ) {
          RotationComponent.y[eid] = (RotationComponent.y[eid] + 1) % 4;
        }
      });

      if (commandsQueue.current.length === 0) forceUpdate(!updated);
    }
  });

  return (
    <group {...props}>
      {tiles.map((eid) => (
        <Clone
          key={eid}
          object={tileset.scene.children[TileComponent.id[eid]]}
          position={[
            PositionComponent.x[eid],
            PositionComponent.y[eid],
            PositionComponent.z[eid],
          ]}
          rotation-z={(RotationComponent.y[eid] * Math.PI) / 2}
          onClick={() => {
            if (
              !commandsQueue.current.find(
                (item: Vector2Tuple) =>
                  item[0] === PositionComponent.x[eid] &&
                  item[1] === PositionComponent.z[eid]
              )
            )
              commandsQueue.current.push([
                PositionComponent.x[eid],
                PositionComponent.z[eid],
              ]);
          }}
        />
      ))}
    </group>
  );
}

useLoader.preload(GLTFLoader, "models/road_tileset.glb");
