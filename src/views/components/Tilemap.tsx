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

export function Tilemap({ ...props }: ComponentProps<"group">) {
  const tiles = useQuery(tilesQuery);

  const tileset = useLoader(GLTFLoader, "/models/road_tileset.glb");

  const commandsQueue = useRef<number[]>([]);

  const [updated, forceUpdate] = useState(false);

  useFrame(() => {
    while (commandsQueue.current.length > 0) {
      const eid = commandsQueue.current.pop() as number;

      RotationComponent.z[eid] = RotationComponent.z[eid] + (1 % 4);

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
          rotation-z={(RotationComponent.z[eid] * Math.PI) / 2}
          onClick={() => {
            if (!commandsQueue.current.includes(eid))
              commandsQueue.current.push(eid);
          }}
        />
      ))}
    </group>
  );
}

useLoader.preload(GLTFLoader, "models/road_tileset.glb");
