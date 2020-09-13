import {
  Camera,
  Scene,
  WebGLRenderTarget,
  PerspectiveCamera,
  OrthographicCamera,
} from "three";
import { Stream } from "@thi.ng/rstream";
import { ResizeEvent } from "../streams";

// type ObjectManager = {
// scenes,
// cameras,
// fbos
// objects
// };

export function resizeCamera(camera: Camera, width: number, height: number) {
  if (camera instanceof PerspectiveCamera) {
    console.log("Resize Camera", camera);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  } else if (camera instanceof OrthographicCamera) {
  }
}

export class ObjectManager {
  cameras: Camera[] = [];
  scenes: Scene[] = [];
  renderTargets: WebGLRenderTarget[] = [];

  constructor(public resize: Stream<ResizeEvent>) {
    this.resize.subscribe({
      next: this.onResizeEvent,
    });
  }

  addCamera(camera: Camera) {
    this.cameras.push(camera);
    const { width, height } = this.resize.deref();
    resizeCamera(camera, width, height);
  }

  onResizeEvent = ({ width, height }: ResizeEvent) => {
    this.cameras.forEach((cam) => resizeCamera(cam, width, height));
    this.renderTargets.forEach(() => {});
  };
}
