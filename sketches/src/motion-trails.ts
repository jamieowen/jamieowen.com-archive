import { trace } from "@thi.ng/rstream";
import { sketch, createGeometryFactory } from "@jamieowen/three";
import { createGui } from "./lib/gui";
import { motionTransform } from "./lib/motion-streams";

// const

const gui = createGui({
  length: [10, 5, 50, 1],
  shape: ["pyrimidd", "cone", "cylinder"],
  motion: ["sine"],
});

motionTransform().subscribe(trace("Motion"));

sketch(({ render }) => {
  render(() => {
    return false;
  });
});
