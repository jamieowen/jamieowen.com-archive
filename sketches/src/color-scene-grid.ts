import { sketch, GeometryAlignment } from "@jamieowen/three";
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
  Color as VecColor,
  hueRotate,
} from "@thi.ng/color";
import { Smush32 } from "@thi.ng/random";

import { createGui } from "./lib/gui";
import { MeshStandardMaterial, Scene } from "three";
import {
  createDomeScene,
  createLightingRig,
  createLightingRigOpts,
  createMeshFactory,
} from "./lib/three";
import { smin } from "@thi.ng/math";

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

const mf = createMeshFactory();

interface RenderScene {
  scene: Scene;
  setColors: (bg: VecColor, fg: VecColor) => void;
  setId: (id: number) => void;
}

const shapesScene2 = (): RenderScene => {
  const scene = new Scene();
  const lights = createLightingRig(
    scene,
    createLightingRigOpts({
      types: "APD",
      intensityMin: 0.3,
      intensityMax: 0.4,
      azimuthAngle: 30,
      polarAngle: 55,
      polarVariance: 0,
      azimuthVariance: 0.2,
      radius: 10,
    })
  );

  const rand = new Smush32(0x23230);

  const dome = createDomeScene(scene);
  mf.standardMaterial({ color: "white", flatShading: true });
  mf.sphere(GeometryAlignment.BOTTOM);

  const geom = [
    mf.geometryFactory.create("box", GeometryAlignment.BOTTOM),
    mf.geometryFactory.create("sphere", GeometryAlignment.BOTTOM),
  ];

  const object = mf.mesh(scene);
  object.castShadow = true;
  dome.floor.receiveShadow = true;
  (object.material as MeshStandardMaterial).metalness = 0;
  (object.material as MeshStandardMaterial).roughness = 2;
  (object.material as MeshStandardMaterial).emissiveIntensity = 0.3;
  (dome.dome.material as MeshStandardMaterial).emissiveIntensity = 0.3;
  return {
    scene,
    setColors: (bg, fg) => {
      // Dome
      (dome.dome.material as MeshStandardMaterial).color.fromArray(bg);
      (dome.dome.material as MeshStandardMaterial).emissive.fromArray(bg);
      // FLoor
      (dome.floor.material as MeshStandardMaterial).color.fromArray(bg);
      // Object
      (object.material as MeshStandardMaterial).color.fromArray(fg);
      (object.material as MeshStandardMaterial).emissive.fromArray(fg);
    },
    setId: (id) => {
      // rand.seed(id);
      // object.geometry = geom[Math.floor(geom.length * rand.float())];
    },
  };
};
const scenes: Record<string, RenderScene> = {
  // shapes: shapeScene(),
  shapes2: shapesScene2(),
};

const gui = createGui({
  aspect: ["1:1", "16:9", "4:3"],
  size: [250, 100, 500, 10],
  scene: Object.keys(scenes),
  // mode: ["hsl", "hsv", "lab50", "oklab"],
  mode: ["hsl", "hsv"],
  hueStep: [0.08, 0.01, 0.4, 0.0001],
  hueTheme: [
    "monochromatic",
    "complementary",
    "split-complementary",
    "analogous",
    "triad",
    "tetradic",
  ],
  saturation: [0.75, 0, 1, 0.01],
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
const tmp2Hue: any = [];
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

  const currY = Math.abs(mod(cell.cell[1], span1 * 2.0) - span1);
  const valY = currY * hueStep;

  // remember to mod the hue
  const mHue = mod(ahue[substep], 1);
  const bg = [mHue, saturation, valY];
  const fg = [mod(mHue + 0.5, 1), saturation, valY];
  return [
    toRgb(tmpHue, bg), // bg
    toRgb(tmp2Hue, fg),
  ];
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

sketch(({ configure, render, renderer, camera, controls }) => {
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
    friction: 0.04,
    maxSpeed: 300,
  }).subscribe({
    next: ({ particle }) => {
      gridPosition.next([particle.position[0], -particle.position[1]]);
    },
  });

  renderer.shadowMap.enabled = true;
  // renderer.shadowMap.type = ShadowMapType.

  camera.lookAt(0, 1, 0);
  controls.target.setY(1);

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

      scene.setColors(color[0], color[1]);
      scene.setId(cell.id);

      renderer.setViewport(rect.x, rect.y, width, height);
      renderer.setScissor(rect.x, rect.y, width, height);
      renderer.render(scene.scene, camera);
    });
    renderer.setScissorTest(false);

    return false;
  });
});
