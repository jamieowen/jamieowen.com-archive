import {
  sketch,
  createLightingRig,
  createLightingRigOpts,
} from "@jamieowen/three";
import { createGui } from "./lib/gui";

const gui = createGui({
  length: [10, 5, 50, 1],
  shape: ["pyrimidd", "cone", "cylinder"],
  motion: ["sine"],
  intensityMin: [0.3, 0, 2, 0.1],
  intensityMax: [1, 0, 2, 0.1],
  azimuthAngle: [45, 0, 360, 1],
  azimuthVariance: [1, 0, 1, 0.01],
  polarAngle: [45, 0, 180, 1],
  polarVariance: [1, 0, 1, 0.01],
  radius: [5, 1, 20, 1],
});

const rigOpts = createLightingRigOpts({
  types: "ADP",
  intensityMin: 0.3,
  intensityMax: 1,
});

gui.subscribe({
  next: ({
    values: {
      intensityMax,
      intensityMin,
      azimuthAngle,
      azimuthVariance,
      polarAngle,
      polarVariance,
      radius,
    },
  }) => {
    rigOpts.next({
      intensityMax,
      intensityMin,
      azimuthAngle,
      azimuthVariance,
      polarAngle,
      polarVariance,
      radius,
    });
  },
});

sketch(({ scene }) => {
  const rig = createLightingRig(scene, rigOpts); // TODO.
  console.log("Lighting");
});
