import { ComponentProps } from "react";
import { useQuery } from "../hooks/useQuery";
import { movementQuery } from "../../logic/queries";
import { ColorComponent, PositionComponent } from "../../logic/components";

export function MovingCubes({ ...props }: ComponentProps<"group">) {
  const movingEntities = useQuery(movementQuery);

  return (
    <group {...props}>
      {movingEntities.map((eid) => {
        return (
          <mesh
            // Key matching our entity id, so R3F can optimize rendering of meshes
            key={eid}
            position={[
              PositionComponent.x[eid],
              PositionComponent.y[eid],
              PositionComponent.z[eid],
            ]}
          >
            <boxGeometry />
            <meshBasicMaterial
              color={`rgb(${ColorComponent.r[eid]}, ${ColorComponent.g[eid]}, ${ColorComponent.b[eid]})`}
            />
          </mesh>
        );
      })}
    </group>
  );
}
