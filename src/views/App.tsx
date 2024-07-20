import { Canvas } from "@react-three/fiber";
import { Outlet } from "@tanstack/react-router";

import "./App.css";
import { Loader } from "@react-three/drei";

function App() {
  return (
    <>
      <Canvas>
        <Outlet />
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
