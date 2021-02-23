import { sketch, createGeometryFactory } from "@jamieowen/three";
import { infiniteGrid, reactive, GridOpts, GridCell } from "@jamieowen/layout";
import { gestureStream } from "@jamieowen/browser";
import { dragGesture2d } from "@jamieowen/motion";
import { Stream, stream, sync, debounce } from "@thi.ng/rstream";
import {
  CONVERSIONS,
  ColorMode,
  convert,
  ReadonlyColor,
  hsvRgb,
  hslRgb,
} from "@thi.ng/color";

import { createGui } from "./lib/gui";
import {
  AmbientLight,
  Color,
  DirectionalLight,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PointLight,
  Scene,
} from "three";
import { clearLine } from "readline";

// function defineReactiveOpts<T>(defaultOpts: T) {
//   return (opts: Partial<T>): Stream<T> => {
//     return {
//       ...defaultOpts,
//       ...opts,
//     };
//   };
// }

// function reactiveOpts<T>(opts: Partial<T>) {}

const fromResizeObserver = (target: HTMLElement) =>
  stream<ResizeObserverEntry>(($) => {
    const observer = new ResizeObserver((entry) => {
      $.next(entry[0]);
    });
    observer.observe(target);
    return () => {
      observer.disconnect();
    };
  });

const sceneLights = (scene: Scene) => {
  const ambient = new AmbientLight("white", 0.4);
  const directional = new DirectionalLight("white", 0.2);
  const point = new PointLight("white", 0.5);
  scene.add(ambient);
  scene.add(directional);
  scene.add(point);
  point.position.z = 4;
  point.position.x = 3;
  directional.position.x = -3;
  directional.position.z = 2;
  return {
    ambient,
    directional,
    point,
  };
};

const geometry = createGeometryFactory();
const shapeScene = () => {
  const scene = new Scene();
  scene.background = new Color("red");
  const background = new Mesh(
    geometry.create("plane"),
    new MeshStandardMaterial({
      // new MeshBasicMaterial({
      color: "white",
    })
  );
  background.scale.multiplyScalar(10);
  const object = new Mesh(
    geometry.create("sphere"),
    new MeshStandardMaterial({
      color: "white",
      flatShading: true,
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
  aspect: ["1:1", "16:9", "4:3"],
  size: [250, 100, 500, 10],
  scene: ["shapes"],
  mode: ["hsl", "hsv", "lab65", "oklab"],
  hueStep: [0.0001, 0.01, 0.4, 0.0001],
  hueSequence: ["monochromatic", "complementary"], // add more later.
});

const hueSeqStep = {
  monochromatic: 1,
  complementary: 2,
};

// "argb32" | "abgr32" | "hcy" | "hsi" | "hsl" | "hsv" | "lab50" | "lab65" | "lch" | "oklab" | "rgb" | "srgb" | "xyy" | "xyz50" | "xyz65" | "ycc";

// const

const hueForCell = (cell: GridCell, hueStep: number, hueSequence: string) => {
  // @ts-ignore
  const seq = hueSeqStep[hueSequence as any];
  // total steps across range
  const span = (1 / hueStep) * seq;
  // current cell step
  const curr = cell.cell[0] % span;

  const hue = curr * hueStep;

  return hslRgb([], [hue, 1, 0.5]);
};

new Array(100).fill(0).forEach((v, i) => {
  console.log(
    hueForCell(
      {
        cell: [i, 0],
        id: i,
        local: [0, 0],
        world: [0, 0],
      },
      gui.deref().values.hueStep,
      gui.deref().values.hueSequence
    )
  );
});
const aspectLookup = { "1:1": 1, "16:9": 9 / 16, "4:3": 3 / 4 };
const getFromSizeAspect = (size: number, aspect: keyof typeof aspectLookup) => {
  const ratio = aspectLookup[aspect];
  return {
    width: size,
    height: Math.round(ratio * size),
  };
};

const gridPosition = reactive([0, 0]);
const gridOpts = reactive<GridOpts>({
  dimensions: [16, 9],
  viewport: [gui.deref().values.width, gui.deref().values.height],
});

// @ts-ignore
const grid = infiniteGrid(gridPosition, gridOpts);

sketch(({ configure, render, renderer, camera }) => {
  configure({
    width: "100%",
    height: "100%",
  });

  sync({
    src: {
      gui,
      resize: fromResizeObserver(renderer.domElement).subscribe(debounce(10)),
    },
  }).subscribe({
    next: ({ gui, resize }) => {
      const { width, height } = getFromSizeAspect(
        gui.values.size,
        gui.values.aspect
      );

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      gridOpts.next({
        ...gridOpts.deref(),
        dimensions: [width, height],
        viewport: [resize.contentRect.width, resize.contentRect.height],
      });
    },
  });

  dragGesture2d(gestureStream(renderer.domElement) as any, {
    friction: 0.07,
    maxSpeed: 300,
  }).subscribe({
    next: ({ particle }) => {
      gridPosition.next([particle.position[0], -particle.position[1]]);
    },
  });

  render(() => {
    const { values } = gui.deref();
    const gridItems = grid.deref();
    //@ts-ignore
    const scene = <typeof scenes.shapes>scenes[values.scene as any];

    renderer.autoClear = false;
    renderer.clear();

    const gopts = gridOpts.deref();
    const [width, height] = gopts.dimensions;

    renderer.setScissorTest(true);
    gridItems.forEach((cell, i) => {
      const rect = {
        x: cell.local[0],
        y: cell.local[1],
        width,
        height,
      };
      const color = hueForCell(cell, values.hueStep, values.hueSequence);
      (scene.background.material as MeshStandardMaterial).color.fromArray(
        color
      );
      renderer.setViewport(rect.x, rect.y, width, height);
      renderer.setScissor(rect.x, rect.y, width, height);
      renderer.render(scene.scene, camera);
    });
    renderer.setScissorTest(false);

    return false;
  });
});
