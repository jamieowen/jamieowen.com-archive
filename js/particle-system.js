import {
  sketch,
  createGeometryFactory
} from "../_snowpack/pkg/@jamieowen/three.js";
import {
  InstancedMesh,
  MeshBasicMaterial,
  Object3D,
  DynamicDrawUsage
} from "../_snowpack/pkg/three.js";
sketch(({render, scene, configure}) => {
  configure({
    width: "1024px",
    height: "768px"
  });
  const count = 100;
  const geom = createGeometryFactory();
  const mesh = new InstancedMesh(geom.create("sphere"), new MeshBasicMaterial(), count);
  mesh.instanceMatrix.setUsage(DynamicDrawUsage);
  scene.add(mesh);
  const obj3d = new Object3D();
  obj3d.scale.multiplyScalar(0.1);
  render(() => {
    mesh.instanceMatrix.needsUpdate = true;
  });
});
