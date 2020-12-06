import {
  createRenderer,
  sketch,
  createGridHelper,
} from "@jamieowen/three-toolkit";
import { Mesh, SphereBufferGeometry, MeshBasicMaterial } from "three";

sketch(({ render, scene, camera, configure, gestures }) => {
  const geom = new SphereBufferGeometry();
  const mesh = new Mesh(geom, new MeshBasicMaterial());
  scene.add(mesh);

  const point = new Mesh(geom, new MeshBasicMaterial({ color: "yellow" }));
  point.scale.multiplyScalar(0.1);
  scene.add(point);

  const grid = createGridHelper();
  scene.add(grid);

  configure({
    width: "800px",
    height: "600px",
  });

  render(({ time }) => {
    const ges = gestures.deref();
    if (ges) {
      point.position.copy(ges.position);
    }

    mesh.rotation.y += 0.01;
  });
});

// sphere(10).lambert("white").mesh();
