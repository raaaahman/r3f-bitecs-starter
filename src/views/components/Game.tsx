import { lazy, Suspense } from "react";
import { LevelData } from "../../types/LevelData";
import { WorldContextProvider } from "../contexts/WorldContext";
import { Cars } from "./Cars";

import { Tilemap } from "./Tilemap";
import { CameraControls, OrthographicCamera } from "@react-three/drei";

export function Game({ levelData }: { levelData: LevelData }) {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ambientLight color="#ececec" intensity={0.66} />
      <OrthographicCamera
        makeDefault
        position={[3, 3, 3]}
        near={-100}
        far={100}
        zoom={42}
      />
      <CameraControls makeDefault />
      <WorldContextProvider levelData={levelData}>
        <group
          position={[
            -levelData.layers[0].tiles.length / 2,
            0,
            -levelData.layers[0].tiles[0].length / 2,
          ]}
        >
          <Suspense>
            <Cars />
            <Tilemap />
          </Suspense>
        </group>
      </WorldContextProvider>
    </>
  );
}
