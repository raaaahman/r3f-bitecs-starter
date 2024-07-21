import { IWorld } from "bitecs";

export type WorldWithTime = IWorld & {
  time: {
    delta: number;
    elapsed: number;
    then: number;
  };
};
