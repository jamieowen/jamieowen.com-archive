import { Mesh, MeshBasicMaterial } from "three";
import { sketch, createGeometryFactory } from "@jamieowen/three";
import { sync, fromRAF } from "@thi.ng/rstream";
import { map, comp } from "@thi.ng/transducers";
import { threeRaycastPlane, gestureStream3d } from "./lib/gestures-fn-style";
import { ease } from "./lib/easing";
import { Vec } from "@thi.ng/vectors";

/**
 * NOTES>..
 *
 * this is a reformating of the gesture stream class to modularise the
 * various steps.
 */

sketch(({ scene, configure, camera, domElement, resize, render }) => {
  const gest = gestureStream3d(domElement, resize, [threeRaycastPlane(camera)]);

  const geom = createGeometryFactory();
  const mesh = new Mesh(
    geom.create("plane"),
    new MeshBasicMaterial({ color: "white" })
  );
  scene.add(mesh);

  // gest.subscribe({
  //   next: ({ position }) => {
  //     // console.log("Position", point);
  //     mesh.position.fromArray(position);
  //   },
  // });

  sync({
    src: {
      raf: fromRAF(),
      // @ts-ignore
      position: gest.transform(map<unknown, Vec>((ev) => ev.position)),
    },
    xform: comp(
      map(({ position }) => position),
      map(ease(0.2))
    ),
  }).subscribe({
    next: (position) => {
      // console.log(position);
      mesh.position.fromArray(position);
    },
  });

  configure({
    width: "50%",
    height: "50%",
  });

  render(() => {});
});
