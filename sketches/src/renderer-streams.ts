import {
  sketch,
  createGridHelper,
  createGeometryFactory,
  GeometryAlignment,
} from "@jamieowen/three-toolkit";
import { sphere } from "packages/three-drawcontext/decl-test/sphere";
import { Mesh, SphereBufferGeometry, MeshBasicMaterial } from "three";

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
