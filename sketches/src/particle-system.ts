import {
  sketch,
  ParticleSystem,
  createGeometryFactory,
} from "@jamieowen/three-toolkit";
import {
  InstancedMesh,
  MeshBasicMaterial,
  Object3D,
  DynamicDrawUsage,
} from "three";

sketch(({ render, scene, configure, keyboard }) => {
  configure({
    width: "1024px",
    height: "768px",
  });

  const count = 100;
  const psystem = new ParticleSystem({
    count,
  });
  const geom = createGeometryFactory();
  const mesh = new InstancedMesh(
    geom.create("sphere"),
    new MeshBasicMaterial(),
    count
  );
  mesh.instanceMatrix.setUsage(DynamicDrawUsage);
  // mesh.count = 3;
  scene.add(mesh);
  const obj3d = new Object3D();
  obj3d.scale.multiplyScalar(0.1);

  console.log(psystem.main);
  render(() => {
    psystem.update();
    psystem.main.forEach(({ position }, i) => {
      obj3d.position.fromArray(position);

      obj3d.updateMatrix();
      mesh.setMatrixAt(i, obj3d.matrix);
    });

    mesh.count = psystem.main.n;
    mesh.instanceMatrix.needsUpdate = true;
  });
});

// meshinstnac
