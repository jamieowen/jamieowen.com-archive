import {
  sketch,
  createGeometryFactory,
  createGridHelper,
  dragGesture3d,
  gestureStream3d
} from "../_snowpack/pkg/@jamieowen/three.js";
import "../_snowpack/pkg/@jamieowen/motion.js";
import {gestureStream} from "../_snowpack/pkg/@jamieowen/browser.js";
import {Mesh, MeshBasicMaterial} from "../_snowpack/pkg/three.js";
const geometries = createGeometryFactory();
const createMesh = (scene, color, scale) => {
  const mesh = new Mesh(geometries.create("sphere"), new MeshBasicMaterial({color}));
  scene.add(mesh);
  mesh.scale.multiplyScalar(scale);
  return mesh;
};
sketch(({render, configure, scene, domElement, camera, resize}) => {
  const mesh1 = createMesh(scene, "yellow", 0.1);
  const mesh2 = createMesh(scene, "orange", 0.1);
  const mesh3 = createMesh(scene, "blue", 0.1);
  const center = createMesh(scene, "blue", 0.075);
  const grid = createGridHelper();
  scene.add(grid);
  const gesture2d$ = gestureStream(domElement, {});
  const gesture3d$ = gestureStream3d(domElement, camera, resize);
  dragGesture3d(gesture3d$).subscribe({
    next: ({particle}) => {
    }
  });
  configure({
    width: "1024px",
    height: "768px"
  });
  render(() => {
  });
});
