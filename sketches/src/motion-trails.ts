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
  motionParticle,
  particleTrails,
  particleIterator,
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
  BoxBufferGeometry,
  Mesh,
  Object3D,
  DirectionalLightHelper,
  DirectionalLight,
  Group,
  Euler,
  Vector3,
  Quaternion,
  Matrix4,
} from "three";
import { map, sideEffect } from "@thi.ng/transducers";
import { set3, sub3 } from "@thi.ng/vectors";

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

/**
 * Render Functions.
 */
const meshFactory = createMeshFactory();

const renderTracer = (parent: Object3D) => {
  meshFactory.box();
  meshFactory.lambertMaterial({
    color: "#efefef",
    emissive: "#efefef",
    emissiveIntensity: 0.25,
  });
  const mesh = meshFactory.mesh(parent);
  mesh.castShadow = true;
  mesh.scale.multiplyScalar(0.25);
  return subscription<
    IMotionEvent<"transform" | "particle">,
    IMotionEvent<"transform" | "particle">
  >({
    next: (ev) => {
      mesh.position.fromArray(ev.data.position);
    },
  });
};

const renderTrails = (count: number, parent: Object3D) => {
  console.log("Render Trails..");
  const box = new BoxBufferGeometry(1, 1, 1, 1, 1, 1);
  const mesh = new Mesh(
    box,
    new MeshStandardMaterial({
      color: "yellow",
    })
  );
  parent.add(mesh);
  const vec1 = new Vector3(1, 0, 0);
  const vec2 = new Vector3(0, 0, 1);
  const quat = new Quaternion();
  // const mat = new Matrix4();

  let c = 0;
  return subscription<
    IMotionEvent<"particle-array">,
    IMotionEvent<"particle-array">
  >({
    next: (ev) => {
      // pick a single point
      const targ = ev.data[10];
      const prev = ev.data[9];
      if (targ) {
        mesh.visible = true;
        mesh.position.fromArray(targ.position);
        mesh.updateMatrixWorld();

        // vec1.fromArray(targ.velocity);
        // vec2.fromArray(prev.velocity);
        // vec1.normalize();
        // vec2.normalize();
        // quat.setFromUnitVectors(vec1, vec2);

        // if (c < 15) {
        //   console.log(">>>", targ, vec1, vec2);
        // } else {
        //   // console.log(c);
        // }

        // mesh.updateMatrix();
        // mesh.applyQuaternion(quat);
        mesh.lookAt(prev.position[0], prev.position[1], prev.position[2]);
      } else {
        mesh.visible = false;
      }
      c++;
    },
  });
};

const renderLines = (count: number, parent: Object3D) => {
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
  parent.add(lines);

  return subscription<
    IMotionEvent<"particle-array">,
    IMotionEvent<"particle-array">
  >({
    next: (ev) => {
      const arr = ev.data;
      for (let i = 0; i < arr.length; i++) {
        positions.setXYZ(
          i,
          arr[i].position[0],
          arr[i].position[1],
          arr[i].position[2]
        );
      }
      geometry.drawRange.count = arr.length;
      positions.needsUpdate = true;
    },
    error: (err) => {
      throw err;
    },
  });
};

sketch(({ render, scene, controls, renderer }) => {
  const rig = createLightingRig(scene, rigOpts);
  // rig.lights[1].castShadow = true;
  // const dirLight: DirectionalLight = rig.lights[1] as DirectionalLight;
  // dirLight.shadow.camera.near = 0.1;
  // dirLight.shadow.camera.far = 10;
  // dirLight.shadow.camera.right = 10;
  // dirLight.shadow.camera.left = -10;
  // dirLight.shadow.camera.top = 10;
  // dirLight.shadow.camera.bottom = -10;
  // rig.lights[1].shadow.mapSize.set(1024, 1024);
  // rig.lights[2].castShadow = false;

  const dome = createDomeScene(scene);
  // dome.floor.material.color.set("violet");
  // dome.floor.receiveShadow = true;
  // renderer.shadowMap.enabled = true;

  // meshFactory.standardMaterial({
  //   color: "#efefef",
  //   emissive: "#efefef",
  //   emissiveIntensity: 0.5,
  // });

  // controls.object.position.set(0, 10, 40);
  // controls.update();

  // Trail Types.

  // Parent container to apply center offset;
  const group = new Group();
  scene.add(group);

  const points$ = Object.entries(EaseTypes)
    .filter(([key]) => key.indexOf("InOut") === -1)
    .filter(([key]) => key.indexOf("Out") > -1)
    // .slice(0, 1)
    .map(([_key, easeFn], idx) =>
      motionParticle()
        .transform(
          mapPosition((t, pos) => {
            // t *= 0.1;
            pos[0] = 0;
            // pos[2] = idx * -1.1 + 1.1 * 13 * 0.5;
            pos[2] = idx * 1.0;
            // pos[1] = 1 + Math.sin(t * 3.0);
            const len = 3.0;
            const T = t + idx * 0.2;
            const tt = 1.0 - Math.abs(((T % len) / len) * 2.0 - 1.0); // + Math.sin(idx + t);
            pos[1] = easeFn(tt) * 10.0 + 1.0;
          })
          // invalidatePosition()
        )
        .subscribe(renderTracer(group))
    );

  const trailLength = 20;
  points$.map((p$) =>
    p$
      .subscribe(particleTrails(trailLength))
      .subscribe(
        particleIterator({
          xform: sideEffect((ev) => {
            const pos = ev.data.position;
            const prev = ev.data.previous;
            // sub3(ev.data.velocity, pos, prev);
            set3(prev, pos);

            pos[0] += 1;
          }),
        })
      )
      .subscribe(renderTrails(trailLength, group))
      .subscribe(renderLines(trailLength, group))
  );

  group.position.set((-trailLength * 0.5) / 2, 0, -points$.length / 2);

  render(() => {});
});
