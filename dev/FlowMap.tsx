import { flowQuery } from "../src/logic/queries";
import { useQuery } from "../src/views/hooks/useQuery";
import { ColorComponent, PositionComponent } from "../src/logic/components";
import {
  FlowComponent,
  POINT_OF_INTEREST,
} from "../src/logic/components/FlowComponent";
import { Vector3 } from "three";
import { Box } from "@react-three/drei";

const COLORS = ["red", "blue", "yellow", "green"];

export default function FlowMap() {
  const flow = useQuery(flowQuery);

  const exits = flow.filter(
    (eid) => FlowComponent.pointOfInterest[eid] & POINT_OF_INTEREST.EXIT
  );

  return (
    <group position-y={0.1}>
      {exits.map((eid) => (
        <Box
          key={eid}
          args={[0.1, 0.1, 0.1]}
          position={[
            PositionComponent.x[eid],
            PositionComponent.y[eid],
            PositionComponent.z[eid],
          ]}
        >
          <meshBasicMaterial color={COLORS[ColorComponent.team[eid]]} />
        </Box>
      ))}
      {flow.map((eid) => {
        const rotation =
          (Math.log2(FlowComponent.direction[eid]) * Math.PI) / 2;

        const direction = new Vector3(
          Math.sin(rotation),
          0,
          Math.cos(rotation)
        );
        const origin = new Vector3(
          PositionComponent.x[eid] - 0.5 * direction.x,
          PositionComponent.y[eid],
          PositionComponent.z[eid] - 0.5 * direction.z
        );

        return (
          <arrowHelper
            key={eid}
            args={[direction, origin, 1, COLORS[ColorComponent.team[eid]]]}
          />
        );
      })}
    </group>
  );
}
