import { trace } from "@thi.ng/rstream";
import { sketch } from "@jamieowen/three";
import { createGui } from "./lib/gui";
import { ITransform, motionTransform } from "./lib/motion-streams";
import {
  createMeshFactory,
  createLightingRig,
  createLightingRigOpts,
  createDomeScene,
} from "./lib/three";
import {} from "three";

const gui = createGui({
  length: [10, 5, 50, 1],
  shape: ["pyrimidd", "cone", "cylinder"],
  motion: ["sine"],
  intensityMin: [0.3, 0, 2, 0.1],
  intensityMax: [1, 0, 2, 0.1],
});

const rigOpts = createLightingRigOpts({
  types: "HPD",
  intensityMin: 0.3,
  intensityMax: 1,
});

gui.subscribe({
  next: ({ values: { intensityMax, intensityMin } }) => {
    rigOpts.next({
      intensityMax,
      intensityMin,
    });
  },
});

// motionTransform().subscribe(trace("Motion"));

sketch(({ render, scene }) => {
  const meshFactory = createMeshFactory();
  meshFactory.standardMaterial({
    color: "blue",
  });
  meshFactory.mesh(scene);
  const lightRig = createLightingRig(scene, rigOpts);
  const dome = createDomeScene(scene);
  render(() => {});
});
