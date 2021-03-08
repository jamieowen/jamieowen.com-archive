import {
  sketch,
  createGridHelper,
  createGeometryFactory
} from "../_snowpack/pkg/@jamieowen/three.js";
import {Mesh, MeshBasicMaterial} from "../_snowpack/pkg/three.js";
sketch(({render, scene, camera, configure, gestures}) => {
  const grid = createGridHelper();
  scene.add(grid);
  const geometry = createGeometryFactory();
  const sphere = geometry.create("sphere");
  const mesh = new Mesh(sphere, new MeshBasicMaterial());
  scene.add(mesh);
  const point = new Mesh(sphere, new MeshBasicMaterial({color: "yellow"}));
  point.scale.multiplyScalar(0.1);
  scene.add(point);
  configure({
    width: "800px",
    height: "600px"
  });
  render(({}) => {
    const ges = gestures.deref();
    if (ges) {
      point.position.copy(ges.position);
    }
    mesh.rotation.y += 0.01;
  });
});
