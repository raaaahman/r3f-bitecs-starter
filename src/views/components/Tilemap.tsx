import { useLoader } from "@react-three/fiber";
import {
  PositionComponent,
  RotationComponent,
  TileComponent,
} from "../../logic/components";
import { tilesQuery } from "../../logic/queries";
import { useQuery } from "../hooks/useQuery";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

import { Clone } from "@react-three/drei";

export function Tilemap() {
  const tiles = useQuery(tilesQuery);

  const tileset = useLoader(GLTFLoader, "/models/road_tileset.glb");

  return (
    <>
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
        />
      ))}
    </>
  );
}

useLoader.preload(GLTFLoader, "models/road_tileset.glb");
