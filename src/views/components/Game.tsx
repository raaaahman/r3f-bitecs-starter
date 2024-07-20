import { useLoader } from "@react-three/fiber";
import { WorldContextProvider } from "../contexts/WorldContext";

import { tiles } from "./tilesets/RoadKit";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export function Game() {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <WorldContextProvider>
        <mesh>
          <boxGeometry />
          <meshBasicMaterial />
        </mesh>
      </WorldContextProvider>
    </>
  );
}

tiles.forEach((tile) =>
  useLoader.preload(GLTFLoader, "/models/roads_kit/" + tile)
);
