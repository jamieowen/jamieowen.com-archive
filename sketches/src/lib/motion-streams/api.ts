import { Vec } from "@thi.ng/vectors";

export interface ITransform {
  position: Vec;
  // add more later
}

export interface IParticle {
  velocity: Vec;
}

export interface IClock {
  time: number;
  delta: number;
  frame: number;
}

export type MotionDataType = "transform" | "particle" | "transform-array";

export interface IMotionEvent<T extends MotionDataType> {
  type: T;
  data: T extends "transform"
    ? ITransform
    : T extends "transform-array"
    ? ITransform[]
    : T extends "particle"
    ? IParticle
    : "transform";

  clock: IClock;
}

export default {}; // snowpack does not export without something?
