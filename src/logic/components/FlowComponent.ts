import { defineComponent, Types } from "bitecs";

export enum POINT_OF_INTEREST {
  EXIT = 1,
}

export const FlowComponent = defineComponent({
  direction: Types.ui8,
  pointOfInterest: Types.ui8,
});
