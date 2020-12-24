import {
  sketch,
  createGeometryFactory,
  infiniteGridIterator,
  infiniteGrid,
  createGridHelper,
  GridOpts,
  reactive,
  GeometryAlignment,
  gestureStream3d,
  dragGesture3d,
} from "@jamieowen/three-toolkit";

import { MeshBasicMaterial, Mesh, Scene, Group, Object3D } from "three";

sketch(({ scene, camera, render, configure, domElement, resize }) => {
  const geometries = createGeometryFactory();
  const cube = geometries.create("box", GeometryAlignment.CENTER);
  const meshPool: Mesh[] = [];
  const gridHelper = createGridHelper();
  const group = new Group();
  scene.add(group);
  scene.add(gridHelper);

  // camera.far = 100000;
  // camera.position.z = 2000;
  // camera.updateProjectionMatrix();

  configure({
    width: "1024px",
    height: "768px",
  });

  const createMesh = () => {
    let mesh;
    if (meshPool.length > 0) {
      mesh = meshPool.shift();
      console.log("retrieeve", meshPool.length);
    } else {
      mesh = new Mesh(cube, new MeshBasicMaterial({ color: "white" }));
      mesh.scale.multiplyScalar(0.9);
    }
    group.add(mesh);
    return mesh;
  };

  const poolMesh = (mesh: Mesh) => {
    group.remove(mesh);
    meshPool.push(mesh);
  };

  const position = reactive([0, 0] as [number, number]);
  const opts = reactive<GridOpts>({
    dimensions: [1, 1],
    viewport: [10, 4],
  });
  group.position.x = 10 / 2;
  group.position.z = 4 / 2;

  infiniteGrid<Mesh>(position, opts, {
    add: (cell) => {
      // console.log("Add", cell.id);
      const mesh = createMesh();
      return mesh;
    },
    remove: (id, mesh) => {
      // console.log("Remove", id);
      poolMesh(mesh);
    },
    update: (cell, mesh) => {
      // console.log("update", cell.local);
      mesh.position.x = -cell.local[0];
      mesh.position.z = -cell.local[1];
    },
  });

  dragGesture3d(gestureStream3d(domElement, camera, resize), {}).subscribe({
    next: ({ particle }) => {
      const xy = [particle.position[0], particle.position[2]] as [
        number,
        number
      ];
      position.next([particle.position[0], particle.position[2]]);
    },
  });

  // console.log("next");
  // console.log("");
  // position.next([10, 10]);
  // console.log("after");
  // console.log("");
  // position.next([300, 300]);
  // console.log("Length:", cells.length);

  render(() => {});
});
