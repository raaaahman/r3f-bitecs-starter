import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./views/components/Experience";
import { WorldContextProvider } from "./views/contexts/WorldContext";

function App() {
  return (
    <Canvas>
      <color attach="background" args={["#000000"]} />
      <WorldContextProvider>
        <Experience />
      </WorldContextProvider>
    </Canvas>
  );
}

export default App;
