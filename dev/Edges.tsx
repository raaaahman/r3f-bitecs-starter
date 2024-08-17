import React from "react";
import { useQuery } from "../src/views/hooks/useQuery";
import { graphQuery } from "../src/logic/queries";
import { PositionComponent } from "../src/logic/components";
import { GraphComponent } from "../src/logic/components/GraphComponent";
import { Box } from "@react-three/drei";

export default function Edges() {
  const edges = useQuery(graphQuery);

  return (
    <group>
      {edges.map((eid) => (
        <group key={eid}>
          {(GraphComponent.edges[eid] & 1) === 1 ? (
            <Box
              args={[0.1, 0.1, 0.1]}
              position={[
                PositionComponent.x[eid],
                PositionComponent.y[eid],
                PositionComponent.z[eid] + 0.45,
              ]}
            />
          ) : null}
          {(GraphComponent.edges[eid] & 2) === 2 ? (
            <Box
              args={[0.1, 0.1, 0.1]}
              position={[
                PositionComponent.x[eid] + 0.45,
                PositionComponent.y[eid],
                PositionComponent.z[eid],
              ]}
            />
          ) : null}
          {(GraphComponent.edges[eid] & 4) === 4 ? (
            <Box
              args={[0.1, 0.1, 0.1]}
              position={[
                PositionComponent.x[eid],
                PositionComponent.y[eid],
                PositionComponent.z[eid] - 0.45,
              ]}
            />
          ) : null}
          {(GraphComponent.edges[eid] & 8) === 8 ? (
            <Box
              args={[0.1, 0.1, 0.1]}
              position={[
                PositionComponent.x[eid] - 0.45,
                PositionComponent.y[eid],
                PositionComponent.z[eid],
              ]}
            />
          ) : null}
        </group>
      ))}
    </group>
  );
}
