import { WorldContextProvider } from "../contexts/WorldContext";

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
