import { useFrame } from "@react-three/fiber";
import { movementSystem } from "../../logic/systems/movementSystem";
import { MovingCubes } from "./MovingCubes";
import { useWorld } from "../hooks/useWorld";
import { useState } from "react";

export function Experience() {
  const world = useWorld();
  // Because our world keeps its object identity, we have to tell React to update the view,
  // so we can render the component tree using fresh data from the ECS.
  const [updated, forceUpdate] = useState<boolean>();

  // Updates world on screen refresh.
  useFrame(({ clock }) => {
    // Pass the delta and elapsed time to our world, so we can use it in our systems.
    world.time.delta = clock.getDelta();
    world.time.elapsed = clock.getElapsedTime();

    // Pass world to ou systems, so the data is updated.
    movementSystem(world);

    forceUpdate(!updated);
  });

  return <MovingCubes />;
}
