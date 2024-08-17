import { IWorld } from "bitecs";

export type WithTime<T extends IWorld> = T & {
  time: {
    delta: number;
    elapsed: number;
    then: number;
  };
};

export type WithBoundaries<T extends IWorld> = T & {
  size: {
    width: number;
    height: number;
  };
};

export type CustomWorld = WithTime<WithBoundaries<IWorld>>;