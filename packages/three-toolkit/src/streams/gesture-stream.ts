import {
  GestureType,
  GestureEvent,
  gestureStream,
  GestureStreamOpts,
  GestureStream,
} from "@thi.ng/rstream-gestures";
import { map } from "@thi.ng/transducers";
import { Raycaster, Plane, Camera, Vector3 } from "three";
import { resizeObserverStream } from "./resize-observer-stream";

export const gestureStream2d = gestureStream;

export type GestureEvent3D = {
  event: GestureEvent;
  type: GestureType;
  raycaster: Raycaster;
  position: Vector3;
  isDown: boolean;
  plane: Plane;
  ndc: Vector3;
  setPlaneNormal: (x: number, y: number, z: number) => void;
};

export const gestureStream3d = (
  domElement: HTMLElement,
  camera: Camera,
  resize: ReturnType<typeof resizeObserverStream>,
  opts?: GestureStreamOpts
) => {
  const raycaster = new Raycaster();
  const position = new Vector3(0, 0, 0);
  const normal = new Vector3(0, 1, 0);
  const plane = new Plane(normal);
  const ndc = new Vector3();
  const setPlaneNormal = (x: number, y: number, z: number) => {
    normal.set(x, y, z);
    plane.set(normal, 0);
  };

  const outputStream = gestureStream2d(domElement, {
    ...opts,
    eventOpts: {},
  }).transform(
    map<GestureEvent, GestureEvent3D>((event) => {
      const { width, height } = resize.deref();
      const { pos } = event;
      const [x, y] = pos;
      ndc.x = (x / width) * 2.0 - 1.0;
      ndc.y = -(y / height) * 2.0 + 1.0;
      raycaster.setFromCamera(ndc, camera);
      raycaster.ray.intersectPlane(plane, position);
      return {
        event,
        ndc,
        type: event.type,
        isDown: event.active.length > 0,
        plane,
        raycaster,
        position,
        setPlaneNormal,
      };
    })
  );

  // Needs better way of merging..

  // const stream3d = stream<GestureEvent3D>((s) => {
  //   s.next({
  //     event: undefined,
  //     isDown: false,
  //     type: undefined,
  //     ndc,
  //     plane,
  //     position,
  //     raycaster,
  //     setPlaneNormal,
  //   });
  // });

  // const s = sync<typeof gestureStream,GestureEvent3D>({
  //   src: [stream3d, outputStream],
  // });
  // s.subscribe({
  //   next: (ev) => {
  //     console.log("NEXT>.", ev);
  //   },
  // });
  return outputStream;
};
