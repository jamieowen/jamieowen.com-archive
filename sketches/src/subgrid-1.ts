import {
  sketch,
  createGeometryFactory,
  infiniteGridIterator,
  infiniteGrid,
  GridOpts,
  reactive,
  GeometryAlignment,
  gestureStream3d,
  dragGesture3d,
} from "@jamieowen/three-toolkit";

import { MeshBasicMaterial, Mesh, Scene } from "three";

sketch(({ scene, camera, render, configure, domElement, resize }) => {
  const geometries = createGeometryFactory();
  const cube = geometries.create("box", GeometryAlignment.CENTER);

  camera.far = 100000;
  camera.position.z = 2000;
  camera.updateProjectionMatrix();

  configure({
    width: "1024px",
    height: "768px",
  });

  const position = reactive([-1000, -23400] as [number, number]);
  const opts = reactive<GridOpts>({
    dimensions: [256, 256],
    viewport: [1024, 768],
  });

  infiniteGrid(position, opts, {
    add: (cell) => {
      console.log("Add", cell.id);
    },
    remove: (cell) => {
      console.log("Remove", cell.id);
    },
    update: (cell) => {},
  });

  const gridIterator = infiniteGridIterator([10000, 240000], {
    dimensions: [256, 256],
    viewport: [1024, 768],
  });

  const createMesh = (scene: Scene) => {
    const mesh = new Mesh(cube, new MeshBasicMaterial({ color: "white" }));
    scene.add(mesh);
    return mesh;
  };

  const cells = [];
  for (let cell of gridIterator) {
    // console.log(cell);
    cells.push(cell);
    const mesh = createMesh(scene);
    mesh.position.x = cell.local[0];
    mesh.position.y = cell.local[1];
    mesh.scale.multiplyScalar(240);
  }

  dragGesture3d(gestureStream3d(domElement, camera, resize), {}).subscribe({
    next: ({ particle }) => {
      const xy = [particle.position[0], particle.position[2]] as [
        number,
        number
      ];
      // position.next(xy);
    },
  });

  console.log("Length:", cells.length);

  render(() => {});
});
