import {
  sketch,
  createGeometryFactory,
  createGridHelper,
  GeometryAlignment,
  gestureStream3d,
  dragGesture3d,
} from "@jamieowen/three";
import {
  infiniteSubGrid,
  SubGridOpts,
  GridOpts,
  reactive,
} from "@jamieowen/layout";
import { paletteCssNames } from "@jamieowen/color";

import {
  MeshStandardMaterial,
  Mesh,
  Group,
  DirectionalLight,
  PointLight,
  Matrix4,
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
  const cube = geometries.create("box", GeometryAlignment.BOTTOM);
  cube.applyMatrix4(new Matrix4().makeTranslation(0.5, 0, 0.5));
  const meshPool: Mesh[] = [];
  const gridHelper = createGridHelper();
  const group = new Group();
  const light = new DirectionalLight(0xffffff, 0.7);
  const plight = new PointLight();

  // const p = new Mesh(cube, new MeshStandardMaterial());
  // scene.add(p);
  // p.position.x = 2;
  // p.position.z = 2;

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

  const probDepth = [0.3, 0.7, 0.8, 0.6]; // probability of subdivision
  const position = reactive([0, 0] as [number, number]);
  const opts = reactive<SubGridOpts>({
    dimensions: [1, 1],
    viewport: [4, 4],
    maxDepth: 3,
    subdivide: (item) => {
      const id = item[0];
      const depth = item[4];
      return randomForId(id) > probDepth[depth];
    },
  });

  group.position.x = -4 / 2;
  group.position.z = -4 / 2;

  infiniteSubGrid<Mesh>(position, opts, {
    add: (cell) => {
      const mesh = createMesh(cell.id);
      const s = cell.cell[1] * 1;
      mesh.scale.set(s, randomForId(cell.id) * 0.1, s);
      return mesh;
    },
    remove: (id, mesh) => {
      poolMesh(mesh);
    },
    update: (cell, mesh) => {
      mesh.position.x = cell.local[0];
      mesh.position.z = cell.local[1];
    },
  });

  dragGesture3d(gestureStream3d(domElement, camera, resize), {}).subscribe({
    next: ({ particle }) => {
      position.next([-particle.position[0], -particle.position[2]]);
    },
  });

  render(() => {
    // console.log(group.children.length);
  });
});
