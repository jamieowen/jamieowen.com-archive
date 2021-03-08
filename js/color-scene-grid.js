import {
  sketch,
  GeometryAlignment,
  createDomeSimpleOpts,
  createDomeSimpleLight,
  createMeshFactory
} from "../_snowpack/pkg/@jamieowen/three.js";
import {infiniteGrid, reactive} from "../_snowpack/pkg/@jamieowen/layout.js";
import {gestureStream} from "../_snowpack/pkg/@jamieowen/browser.js";
import {dragGesture2d, motionTransform, mapPosition} from "../_snowpack/pkg/@jamieowen/motion.js";
import {stream, sync} from "../_snowpack/pkg/@thi.ng/rstream.js";
import {
  hsvRgb,
  hslRgb,
  oklabRgb,
  labRgb
} from "../_snowpack/pkg/@thi.ng/color.js";
import {createGui} from "../_snowpack/pkg/@jamieowen/gui.js";
import {Color, Scene, Vector3} from "../_snowpack/pkg/three.js";
const fromResizeObserver = (target) => stream(($) => {
  const observer = new ResizeObserver((entry) => {
    $.next(entry[0]);
  });
  observer.observe(target);
  return () => {
    observer.disconnect();
  };
});
const mf = createMeshFactory();
const shapesScene2 = () => {
  const scene = new Scene();
  scene.background = new Color("blue");
  const dome = createDomeSimpleLight(scene, createDomeSimpleOpts({showHelpers: false, intensity: [0.2, 0.4, 0.3]}));
  mf.phongMaterial({color: "white", flatShading: true});
  mf.sphere(GeometryAlignment.BOTTOM);
  const geom = [
    mf.geometryFactory.create("box", GeometryAlignment.BOTTOM),
    mf.geometryFactory.create("sphere", GeometryAlignment.BOTTOM)
  ];
  const object = mf.mesh(scene);
  object.castShadow = true;
  object.material.metalness = 0;
  object.material.roughness = 2;
  object.material.emissiveIntensity = 0.1;
  dome.dome.material.emissiveIntensity = 0.3;
  return {
    scene,
    setColors: (bg, fg) => {
      dome.dome.material.color.fromArray(bg);
      dome.dome.material.emissive.fromArray(bg);
      dome.floor.material.color.fromArray(bg);
      object.material.color.fromArray(fg);
      object.material.emissive.fromArray(fg);
    },
    setId: (id) => {
    },
    update() {
      object.rotation.y += 0.01;
    }
  };
};
const SCENES = {
  shapes: shapesScene2()
};
const gui = createGui({
  aspect: ["1:1", "16:9", "4:3"],
  size: [350, 100, 500, 10],
  scene: Object.keys(SCENES),
  mode: ["hsl", "hsv"],
  hueStep: [0.1, 0.01, 0.4, 1e-4],
  hueTheme: [
    "monochromatic",
    "complementary",
    "split-complementary",
    "analogous",
    "triad",
    "tetradic"
  ],
  saturation: [0.75, 0, 1, 0.01]
});
const hueThemeSteps = {
  monochromatic: 1,
  complementary: 2,
  triad: 3,
  analogous: 3,
  "split-complementary": 3,
  tetradic: 4
};
const T1 = 1 / 12;
const T4 = T1 * 4;
const T3 = T1 * 3;
const hueThemeValues = {
  monochromatic: (hue) => [hue],
  complementary: (hue) => [hue, hue + 0.5],
  analogous: (hue) => [hue, hue + T1, hue - T1],
  triad: (hue) => [hue, hue + T4, hue - T4],
  "split-complementary": (hue) => [hue, hue + 0.5 + T1, hue + 0.5 - T1],
  tetradic: (hue) => [hue, hue + T3, hue + 0.5, hue - T3]
};
const hueModes = {
  hsl: hslRgb,
  hsv: hsvRgb,
  lab50: labRgb,
  oklab: oklabRgb
};
const mod = (n, m) => (n % m + m) % m;
const tmpHue = [];
const tmp2Hue = [];
const hueForCell = (cell, hueStep, hueTheme, hueMode = "hsl", saturation = 0.5) => {
  const seq = hueThemeSteps[hueTheme];
  const toRgb = hueModes[hueMode];
  const span1 = Math.floor(1 / hueStep);
  const span = span1 * seq;
  const curr = mod(cell.cell[0], span);
  const substep = mod(curr, seq);
  const hue = (curr - substep) * hueStep;
  const ahue = hueThemeValues[hueTheme](hue);
  const currY = Math.abs(mod(cell.cell[1], span1 * 2) - span1);
  const valY = currY * hueStep;
  const mHue = mod(ahue[substep], 1);
  const bg = [mHue, saturation, valY];
  const fg = [mod(mHue + 0.5, 1), saturation, valY];
  return [
    toRgb(tmpHue, bg),
    toRgb(tmp2Hue, fg)
  ];
};
const aspectLookup = {"1:1": 1, "16:9": 9 / 16, "4:3": 3 / 4};
const getFromSizeAspect = (size, aspect) => {
  const ratio = aspectLookup[aspect];
  return {
    width: size,
    height: Math.round(ratio * size)
  };
};
const gridPosition = reactive([0, 0]);
const gridOpts = reactive({
  dimensions: [16, 9],
  viewport: [100, 100]
});
const grid = infiniteGrid(gridPosition, gridOpts);
const camPos = new Vector3();
const camVert = new Vector3();
const camHorz = new Vector3();
sketch(({configure, render, renderer, camera, controls}) => {
  configure({
    width: "100%",
    height: "100%"
  });
  sync({
    src: {
      gui,
      resize: fromResizeObserver(renderer.domElement)
    }
  }).subscribe({
    next: ({gui: gui2, resize}) => {
      const {width, height} = getFromSizeAspect(gui2.values.size, gui2.values.aspect);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      gridOpts.next({
        ...gridOpts.deref(),
        dimensions: [width, height],
        viewport: [resize.contentRect.width, resize.contentRect.height]
      });
    }
  });
  renderer.domElement.style.touchAction = "none";
  dragGesture2d(gestureStream(renderer.domElement), {
    friction: 0.04,
    maxSpeed: 300
  }).subscribe({
    next: ({particle}) => {
      gridPosition.next([
        particle.data.position[0],
        -particle.data.position[1]
      ]);
    }
  });
  renderer.shadowMap.enabled = true;
  const ENABLE_ANIM = true;
  const camT = motionTransform().transform(mapPosition((t, pos) => {
    if (!ENABLE_ANIM) {
      return;
    }
    const D = 6;
    pos[0] = D;
    pos[1] = 0.5;
    pos[2] = 3;
  })).subscribe({
    next: (ev) => {
      camera.position.fromArray(ev.data.position);
      camera.lookAt(0, 0.5, 0);
    }
  });
  controls.enabled = !ENABLE_ANIM;
  let cc = 0;
  render(({time}) => {
    const {values} = gui.deref();
    const gridItems = grid.deref();
    const scene = SCENES[values.scene];
    renderer.autoClear = false;
    renderer.clear();
    scene.update(time);
    const gopts = gridOpts.deref();
    const [width, height] = gopts.dimensions;
    const [vwidth, vheight] = gopts.viewport;
    const camP = camT.deref();
    if (camP) {
      camPos.fromArray(camP.data.position);
    }
    camVert.set(0, 1, 0).applyEuler(camera.rotation).normalize();
    camHorz.set(1, 0, 0).applyEuler(camera.rotation).normalize();
    if (cc % 100 === 0) {
    }
    renderer.setScissorTest(true);
    scene.scene.autoUpdate = false;
    scene.scene.matrixAutoUpdate = false;
    scene.scene.updateMatrixWorld();
    gridItems.forEach((cell, _i) => {
      const x = cell.local[0];
      const y = cell.local[1];
      const color = hueForCell(cell, values.hueStep, values.hueTheme, values.mode, values.saturation);
      if (ENABLE_ANIM) {
        const cx = (x + width / 2) / vwidth * 2 - 1;
        const cy = (y - height / 2) / vheight * 2 - 1;
        camera.position.fromArray(camP.data.position);
        camPos.copy(camHorz);
        camPos.multiplyScalar(cx * -1.7);
        camera.position.add(camPos);
        camPos.copy(camVert);
        camPos.multiplyScalar(cy * -0.5);
        camera.position.add(camPos);
        camera.updateMatrixWorld();
      }
      scene.setColors(color[0], color[1]);
      scene.setId(cell.id);
      renderer.setViewport(x, y, width, height);
      renderer.setScissor(x, y, width, height);
      renderer.render(scene.scene, camera);
    });
    cc++;
    renderer.setScissorTest(false);
    return false;
  });
});
