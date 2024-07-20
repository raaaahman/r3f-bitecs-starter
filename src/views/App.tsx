import { Canvas } from "@react-three/fiber";
import { Outlet } from "@tanstack/react-router";

import "./App.css";

function App() {
  return (
    <Canvas>
      <Outlet />
    </Canvas>
  );
}

export default App;
