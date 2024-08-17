import { defineComponent, Types } from "bitecs";

export enum DIRECTION {
  SOUTH = 1,
  EAST = 2,
  NORTH = 4,
  WEST = 8,
}

export const GraphComponent = defineComponent({
  edges: Types.ui8,
});
