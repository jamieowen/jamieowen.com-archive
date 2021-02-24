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
  rgbHsl,
  oklabRgb,
  labRgb,
  labRgbD65,
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
import { Vec } from "@thi.ng/vectors";

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
  aspect: ["1:1", "16:9", "4:3"],
  size: [250, 100, 500, 10],
  scene: ["shapes"],
  // mode: ["hsl", "hsv", "lab50", "oklab"],
  mode: ["hsl", "hsv"],
  hueStep: [0.01, 0.01, 0.4, 0.0001],
  hueTheme: [
    "monochromatic",
    "complementary",
    "split-complementary",
    "analogous",
    "triad",
    "tetradic",
  ],
  saturation: [0.5, 0, 1, 0.01],
});

type HueTheme =
  | "monochromatic"
  | "complementary"
  | "split-complementary"
  | "triad"
  | "analogous"
  | "tetradic";

const hueThemeSteps: Record<HueTheme, number> = {
  monochromatic: 1,
  complementary: 2,
  triad: 3,
  analogous: 3,
  "split-complementary": 3,
  tetradic: 4,
};

const T1 = 1 / 12;
const T4 = T1 * 4;
const T3 = T1 * 3;
const hueThemeValues: Record<HueTheme, any> = {
  monochromatic: (hue: number) => [hue],
  complementary: (hue: number) => [hue, hue + 0.5],
  analogous: (hue: number) => [hue, hue + T1, hue - T1],
  triad: (hue: number) => [hue, hue + T4, hue - T4],
  "split-complementary": (hue: number) => [hue, hue + 0.5 + T1, hue + 0.5 - T1],
  tetradic: (hue: number) => [hue, hue + T3, hue + 0.5, hue - T3],
};

// @ts-ignore
const hueModes: Record<Partial<ColorMode>, any> = {
  hsl: hslRgb,
  hsv: hsvRgb,
  lab50: labRgb,
  oklab: oklabRgb,
  // oklab: (out: Vec, src: Vec) => oklabRgb(out, []),
};

const mod = (n: number, m: number) => ((n % m) + m) % m;
const tmpHue: any = [];
const hueForCell = (
  cell: GridCell,
  hueStep: number,
  hueTheme: HueTheme,
  hueMode: ColorMode = "hsl",
  saturation: number = 0.5
) => {
  // number of steps in hue theme
  const seq = hueThemeSteps[hueTheme];
  // converter
  const toRgb = hueModes[hueMode];
  // single span
  const span1 = Math.floor(1 / hueStep);
  // total steps across range for sequence
  const span = span1 * seq;
  // current cell step
  const curr = mod(cell.cell[0], span);
  // current sub cell step ( for hue theme )
  const substep = mod(curr, seq);
  // start hue
  const hue = (curr - substep) * hueStep;
  // real hue
  const ahue = hueThemeValues[hueTheme](hue);
  // console.log(span, curr, seq, substep, ahue);

  const currY = mod(cell.cell[1], span1);
  const valY = currY * hueStep;

  // remember to mod the hue
  return toRgb(tmpHue, [mod(ahue[substep], 1), saturation, valY]);
};

// new Array(100).fill(0).forEach((v, i) => {
//   console.log(
//     hueForCell(
//       {
//         cell: [i * 200 - 1000, 0],
//         id: i,
//         local: [0, 0],
//         world: [0, 0],
//       },
//       0.014,
//       "complementary"
//     )
//   );
// });

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
  viewport: [100, 100], // resize stream will pick up.
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
      resize: fromResizeObserver(renderer.domElement), //.subscribe(debounce(1)),
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
    // return;
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
      const color = hueForCell(
        cell,
        values.hueStep,
        values.hueTheme,
        values.mode,
        values.saturation
      );
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
