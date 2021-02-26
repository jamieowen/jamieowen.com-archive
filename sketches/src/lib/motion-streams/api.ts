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

export interface IMotionEvent<
  T extends "transform" | "particle" | "transform-array"
> {
  type: T;
  data: T extends "transform"
    ? ITransform
    : T extends "transform-array"
    ? ITransform[]
    : null;
  clock: IClock;
}

export default {}; // snowpack does not export without something?
