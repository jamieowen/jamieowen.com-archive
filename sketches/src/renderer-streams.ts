import {
  sketch,
  createGridHelper,
  createGeometryFactory,
} from "@jamieowen/three-toolkit";
import { Mesh, MeshBasicMaterial } from "three";

sketch(({ render, scene, camera, configure, gestures }) => {
  const grid = createGridHelper();
  scene.add(grid);
  const geometry = createGeometryFactory();
  const sphere = geometry.create("sphere");
  const mesh = new Mesh(sphere, new MeshBasicMaterial());
  scene.add(mesh);

  const point = new Mesh(sphere, new MeshBasicMaterial({ color: "yellow" }));
  point.scale.multiplyScalar(0.1);
  scene.add(point);

  // particles..
  // definition of array buffers. using iterators / generators
  // iterate over buffers.
  // multiplex and workers.
  // keep as parallel as possible
  // add components, position, velocity, color, age, maxage
  // what about events? how to determine

  configure({
    width: "800px",
    height: "600px",
  });

  render(({}) => {
    const ges = gestures.deref();
    if (ges) {
      point.position.copy(ges.position);
    }

    mesh.rotation.y += 0.01;
  });
});

// sphere(10).lambert("white").mesh();
