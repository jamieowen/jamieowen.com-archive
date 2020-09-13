import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  WebGLRendererParameters,
} from "three";
import { ResizeEvent } from "../streams";
import { Stream } from "@thi.ng/rstream";
import { ObjectManager } from "./object-manager";

interface ThreeRenderer {
  renderer: WebGLRenderer;
  scene: Scene;
  camera: PerspectiveCamera;
  om: ObjectManager;
}

export const defaultThreeParams = (
  init: WebGLRendererParameters = {}
): WebGLRendererParameters => {
  return {
    antialias: true,
    ...init,
  };
};

export function createThreeRenderer(
  container: HTMLElement,
  resize: Stream<ResizeEvent>,
  params?: WebGLRendererParameters
): ThreeRenderer {
  const _params = defaultThreeParams(params);
  const renderer = new WebGLRenderer(_params);
  const camera = new PerspectiveCamera(45, 4 / 3, 0.1, 1000);
  const scene = new Scene();
  const om = new ObjectManager(resize);

  om.cameras.push(camera);
  scene.add(camera);
  renderer.setPixelRatio(2);

  container.appendChild(renderer.domElement);
  resize.subscribe({
    next: ({ width, height }) => {
      renderer.setSize(width, height);
    },
  });

  return { renderer, scene, camera, om };
}
