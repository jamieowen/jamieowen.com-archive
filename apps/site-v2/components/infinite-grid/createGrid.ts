import {
  Camera,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneBufferGeometry,
} from "three";
import { GridOpts, infiniteGrid, reactive } from "@jamieowen/layout";
import { createGeometryFactory } from "@jamieowen/three";
import { resizeObserverStream, gestureStream3d } from "@jamieowen/browser";
import { dragGesture3d } from "@jamieowen/motion";
import { createGeometry, updateUV, updateMesh } from "./geometry";
import { SpriteMeshFactory } from "./SpriteMeshFactory";

export const createGestures = (domElement: HTMLElement, camera: Camera) => {
  const resize = resizeObserverStream(domElement);
  const pointer = gestureStream3d(domElement, camera as any, resize, {
    normal: [0, 0, 1],
  });

  const drag = dragGesture3d(pointer, {
    // friction: 0.9,
    // maxSpeed: 10,
  });

  return {
    resize,
    pointer,
    drag,
  };
};

export const createGrid = (factory: SpriteMeshFactory) => {
  // const pool = {
  //   count: 0,
  //   visible: [], // need a better way of accessing the map inside the grid stream
  //   map: new Map(),
  // };

  const geometry = createGeometryFactory();
  const plane = geometry.create("plane");
  const group = new Group();
  const position = reactive([0, 0] as [number, number]);
  const opts = reactive<GridOpts>({
    dimensions: [2, 2],
    viewport: [8, 4],
  });

  const grid = infiniteGrid<Mesh>(position, opts, {
    add: (cell) => {
      const mesh = factory.create(cell);
      group.add(mesh);
      return mesh;
    },
    remove: (id: number, mesh) => {
      group.remove(mesh);
      factory.release(mesh);
    },
    update: ({ id, world, local }, mesh) => {
      mesh.position.x = local[0];
      mesh.position.y = local[1];
    },
  });

  return {
    grid,
    group,
    opts,
    position,
    // pool,
  };
};
