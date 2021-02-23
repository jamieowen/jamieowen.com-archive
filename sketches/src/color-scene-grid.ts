import {
  sketch,
  dragGesture3d,
  gestureStream3d,
  renderViewportRect,
  createGeometryFactory,
} from "@jamieowen/three";
import { infiniteGrid, reactive, GridOpts } from "@jamieowen/layout";
import { Stream } from "@thi.ng/rstream";
import {} from "@thi.ng/color";
import { createGui } from "./lib/gui";
import {
  AmbientLight,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PointLight,
  Scene,
} from "three";

// function defineReactiveOpts<T>(defaultOpts: T) {
//   return (opts: Partial<T>): Stream<T> => {
//     return {
//       ...defaultOpts,
//       ...opts,
//     };
//   };
// }

// function reactiveOpts<T>(opts: Partial<T>) {}

const sceneLights = (scene: Scene) => {
  const ambient = new AmbientLight("white", 0.2);
  const directional = new DirectionalLight("white", 0.2);
  const point = new PointLight("white", 0.3);
  scene.add(ambient);
  scene.add(directional);
  scene.add(point);
  return {
    ambient,
    directional,
    point,
  };
};

const geometry = createGeometryFactory();
const shapeScene = () => {
  const scene = new Scene();
  const background = new Mesh(
    geometry.create("plane"),
    new MeshStandardMaterial({
      color: "white",
    })
  );
  const object = new Mesh(
    geometry.create("sphere"),
    new MeshStandardMaterial({
      color: "blue",
    })
  );
  scene.add(background, object);
  const lights = sceneLights(scene);
  return {
    scene,
    lights,
    background,
    object,
  };
};

const scenes = {
  shapes: shapeScene(),
};

const gui = createGui({
  width: [4, 2, 10, 1],
  height: [4, 2, 10, 1],
});

sketch(({ configure, render }) => {
  configure({
    width: "100%",
    height: "100%",
  });

  const gridPosition = reactive([0, 0]);
  const gridOpts = reactive<GridOpts>({
    dimensions: [1, 1],
    viewport: [gui.deref().values.width, gui.deref().values.height],
  });

  gui.subscribe({
    next: ({ values }) => {
      gridOpts.next({
        ...gridOpts.deref(),
        viewport: [values.width, values.height],
      });
    },
  });

  // @ts-ignore
  const grid = infiniteGrid(gridPosition, gridOpts);

  render(() => {
    const gridItems = grid.deref();
    console.log("render");
    for (let item of gridItems) {
    }
  });
});
