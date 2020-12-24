import {
  sketch,
  createGeometryFactory,
  infiniteSubGrid,
  createGridHelper,
  GridOpts,
  reactive,
  GeometryAlignment,
  gestureStream3d,
  dragGesture3d,
  paletteCssNames,
} from "@jamieowen/three-toolkit";

import {
  MeshStandardMaterial,
  Mesh,
  Group,
  DirectionalLight,
  PointLight,
} from "three";
import { Smush32 } from "@thi.ng/random";

const smush = new Smush32();
const randomForId = (id: number) => {
  smush.seed(id);
  return smush.float(1);
};
const cssNames = paletteCssNames();
const randomColor = (id: number) => {
  const rand = randomForId(id);
  const idx = Math.round(rand * (cssNames.length - 1));
  return cssNames[idx];
};

sketch(({ scene, camera, render, configure, domElement, resize }) => {
  const geometries = createGeometryFactory();
  const cube = geometries.create("box", GeometryAlignment.CENTER);
  const meshPool: Mesh[] = [];
  const gridHelper = createGridHelper();
  const group = new Group();
  const light = new DirectionalLight(0xffffff, 0.4);
  const plight = new PointLight();

  light.position.set(1, 4, 2);
  plight.position.set(0.2, 1, 0);

  camera.near = 0.5;
  camera.updateProjectionMatrix();

  scene.add(light);
  scene.add(plight);
  scene.add(group);
  scene.add(gridHelper);

  configure({
    width: "1024px",
    height: "768px",
  });

  const createMesh = (id: number) => {
    let mesh: Mesh;
    if (meshPool.length > 0) {
      mesh = meshPool.shift();
    } else {
      mesh = new Mesh(cube, new MeshStandardMaterial({ color: "white" }));
      mesh.scale.multiplyScalar(0.8);
    }
    const color = randomColor(id);
    (mesh.material as MeshStandardMaterial).color.fromArray(color);
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
    viewport: [7, 5],
  });
  group.position.x = 7 / 2;
  group.position.z = 5 / 2;

  infiniteSubGrid<Mesh>(position, opts, {
    add: (cell) => {
      return createMesh(cell.id);
    },
    remove: (id, mesh) => {
      poolMesh(mesh);
    },
    update: (cell, mesh) => {
      mesh.position.x = -cell.local[0];
      mesh.position.z = -cell.local[1];
    },
  });

  dragGesture3d(gestureStream3d(domElement, camera, resize), {}).subscribe({
    next: ({ particle }) => {
      position.next([particle.position[0], particle.position[2]]);
    },
  });

  render(() => {});
});
