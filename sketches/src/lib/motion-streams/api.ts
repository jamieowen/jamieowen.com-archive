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

export interface IMotionEvent {
  type: "transform" | "particle";
  data: ITransform;
  clock: IClock;
}
