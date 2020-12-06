import {
  GestureType,
  GestureEvent,
  gestureStream,
  GestureStreamOpts,
} from "@thi.ng/rstream-gestures";
import { StreamMerge } from "@thi.ng/rstream";
import { map } from "@thi.ng/transducers";
import { Raycaster, Plane, Camera, Vector3 } from "three";
import { resizeObserverStream } from "./resize-observer-stream";

export const gestureStream2d = gestureStream;

export const gestureStream3d = (
  domElement: HTMLElement,
  camera: Camera,
  resize: ReturnType<typeof resizeObserverStream>,
  opts?: GestureStreamOpts
) => {
  return new GestureStream3D(domElement, camera, resize, opts);
};

export type GestureEvent3D = {
  event: GestureEvent;
  type: GestureType;
  raycaster: Raycaster;
  position: Vector3;
  isDown: boolean;
  plane: Plane;
  ndc: Vector3;
};
export class GestureStream3D extends StreamMerge<GestureEvent, GestureEvent3D> {
  position: Vector3;
  normal: Vector3;
  raycaster: Raycaster;

  constructor(
    domElement: HTMLElement,
    camera: Camera,
    resize: ReturnType<typeof resizeObserverStream>,
    opts?: GestureStreamOpts
  ) {
    const raycaster = new Raycaster();
    const position = new Vector3(0, 0, 0);
    const normal = new Vector3(0, 1, 0);
    const stream = gestureStream(domElement, { ...opts });
    const plane = new Plane(normal);
    const ndc = new Vector3();

    super({
      src: [stream],
      xform: map((event) => {
        const { width, height } = resize.deref();
        const { pos } = event;
        const [x, y] = pos;
        ndc.x = (x / width) * 2.0 - 1.0;
        ndc.y = -(y / height) * 2.0 + 1.0;
        raycaster.setFromCamera(ndc, camera);
        raycaster.ray.intersectPlane(plane, position);

        return {
          pos,
          ndc,
          type: event.type,
          event,
          isDown: event.active.length > 0,
          plane,
          raycaster,
          position,
        };
      }),
    });
  }
}
