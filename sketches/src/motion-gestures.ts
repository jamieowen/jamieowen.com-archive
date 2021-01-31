import { Mesh, MeshBasicMaterial } from "three";
import { trace } from "@thi.ng/transducers";
import { reactive } from "@thi.ng/rstream";
import { sketch, createGeometryFactory } from "@jamieowen/three";
import { gestureStream3d, threeRaycastPlane } from "./lib";

sketch(({ scene, configure, camera, domElement, resize, render }) => {
  const gest = gestureStream3d(domElement, resize, [threeRaycastPlane(camera)]);

  const geom = createGeometryFactory();
  const mesh = new Mesh(
    geom.create("plane"),
    new MeshBasicMaterial({ color: "white" })
  );
  scene.add(mesh);

  gest.subscribe({
    next: ({ point }) => {
      // console.log("Position", point);
      mesh.position.fromArray(point);
    },
  });
  configure({
    width: "50%",
    height: "50%",
  });

  render(() => {});
});
