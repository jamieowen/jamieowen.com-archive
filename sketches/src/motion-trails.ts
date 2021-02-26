import { trace, subscription, State } from "@thi.ng/rstream";
import { sketch } from "@jamieowen/three";
import { createGui } from "./lib/gui";
import {
  ITransform,
  motionTransform,
  mapPosition,
  invalidatePosition,
  trails,
  EaseTypes,
  IMotionEvent,
} from "./lib/motion-streams";

import {
  createMeshFactory,
  createLightingRig,
  createLightingRigOpts,
  createDomeScene,
  createInstancedMesh,
  instancedMeshIterator,
} from "./lib/three";

import {
  BufferAttribute,
  BufferGeometry,
  MeshStandardMaterial,
  Line,
  LineBasicMaterial,
  DynamicDrawUsage,
} from "three";

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
  types: "APD",
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

sketch(({ render, scene }) => {
  const lightRig = createLightingRig(scene, rigOpts);
  const dome = createDomeScene(scene);

  const meshFactory = createMeshFactory();
  meshFactory.standardMaterial({
    color: "#efefef",
    emissive: "#efefef",
    emissiveIntensity: 0.5,
  });

  meshFactory.box();

  const renderTracer = () => {
    const mesh = meshFactory.mesh(scene);
    return subscription<IMotionEvent<"transform">, IMotionEvent<"transform">>({
      next: (ev) => {
        mesh.position.fromArray(ev.data.position);
      },
    });
  };

  const renderTrails = (count: number) => {
    const instanced = createInstancedMesh(
      meshFactory.geometryFactory.create("box"),
      new MeshStandardMaterial({
        color: "white",
      }),
      count
    );
    return subscription<
      IMotionEvent<"transform-array">,
      IMotionEvent<"transform-array">
    >({
      next: (ev) => {
        if (count === 0) {
          console.log(ev);
        }
        count++;
      },
    });
  };

  const renderLines = (count: number) => {
    const positions = new BufferAttribute(new Float32Array(3 * count), 3);
    const geometry = new BufferGeometry();
    positions.usage = DynamicDrawUsage;
    geometry.setAttribute("position", positions);
    const lines = new Line(
      geometry,
      new LineBasicMaterial({
        color: "white",
      })
    );
    scene.add(lines);

    return subscription<
      IMotionEvent<"transform-array">,
      IMotionEvent<"transform-array">
    >({
      next: (ev) => {
        const arr = ev.data;
        for (let i = 0; i < arr.length; i++) {
          positions.setXYZ(
            i,
            arr[i].position[0] + i * 0.4,
            arr[i].position[1],
            arr[i].position[2]
          );
        }
        positions.needsUpdate = true;
      },
      error: (err) => {
        throw err;
      },
    });
  };

  const points$ = Object.entries(EaseTypes)
    .filter(([key]) => key.indexOf("InOut") > -1)
    // .slice(0, 1)
    .map(([_key, easeFn], idx) =>
      motionTransform()
        .transform(
          mapPosition((t, pos) => {
            pos[0] = -3;
            pos[2] = idx * -1.1 + 1.1 * 13 * 0.5;
            // pos[1] = 1 + Math.sin(t * 3.0);
            const len = 3.0;
            const T = t + idx * 0.2;
            const tt = 1.0 - Math.abs(((T % len) / len) * 2.0 - 1.0); // + Math.sin(idx + t);
            pos[1] = easeFn(tt) * 4.0 + 1.0;
          })
          // invalidatePosition()
        )
        .subscribe(renderTracer())
    );

  const trailLength = 30;
  const trails$ = points$.map((p$) =>
    p$
      .subscribe(trails(trailLength))
      .subscribe(renderTrails(trailLength))
      .subscribe(renderLines(trailLength))
  );
  console.log(points$);
  console.log(trails$);

  render(() => {});
});
