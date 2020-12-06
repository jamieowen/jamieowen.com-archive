import { Fn } from "@thi.ng/api";
import { PerspectiveCamera, Scene } from "three";
import { rafClockStream } from "../streams/raf-clock-stream";
import { gestureStream3d } from "../streams/gesture-stream";
import { keyboardStream } from "../streams/keyboard-stream";
import { createRenderer } from "./create-renderer";
import { orbitControls } from "./create-controls";

type SketchConfigure = {
  width: number | string;
  height: number | string;
};

type SketchSetup = ReturnType<typeof createRenderer> & {
  scene: Scene;
  camera: PerspectiveCamera;
  render: Fn<FnSketchRender, void>;
  configure: Fn<SketchConfigure, void>;
  clock: ReturnType<typeof rafClockStream>;
  controls: ReturnType<typeof orbitControls>;
  gestures: ReturnType<typeof gestureStream3d>;
  keyboard: ReturnType<typeof keyboardStream>;
};

type SketchRender = {
  delta: number;
  time: number;
  frame: number;
};

type FnSketchSetup = Fn<SketchSetup, void>;
type FnSketchRender = Fn<SketchRender, void>;

export function createSketch(
  setup: FnSketchSetup,
  container?: HTMLElement
): void {
  const { domElement, renderer, resize } = createRenderer(container);
  renderer.setPixelRatio(2);
  const scene = new Scene();
  const camera = new PerspectiveCamera(45);
  camera.position.set(0, 2, 10);
  camera.lookAt(0, 0, 0);
  resize.subscribe({
    next: ({ width, height }) => {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    },
  });
  let userRender: FnSketchRender;
  const render: Fn<FnSketchRender, void> = (render: FnSketchRender): void => {
    userRender = render;
  };
  const clock = rafClockStream();
  clock.subscribe({
    next: ({ delta, frame, time }) => {
      if (userRender) {
        userRender({
          delta,
          frame,
          time,
        });
        renderer.render(scene, camera);
      }
    },
  });
  const controls = orbitControls(camera, renderer.domElement);
  controls.enabled = false;
  const gestures = gestureStream3d(renderer.domElement, camera, resize);
  const keyboard = keyboardStream({
    listen: [" "],
  });
  keyboard.subscribe({
    next: ({ isKeyDown, keysDown, keysToggled }) => {
      controls.enabled = isKeyDown;
    },
  });

  const configure = (config: Partial<SketchConfigure>) => {
    domElement.style.width = config.width.toString();
    domElement.style.height = config.height.toString();
  };
  setup({
    domElement,
    renderer,
    scene,
    camera,
    resize,
    render,
    clock,
    configure,
    controls,
    gestures,
    keyboard,
  });
}

export const sketch = createSketch;
