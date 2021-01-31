import {
  gestureStream,
  GestureEvent,
  resizeObserverStream,
  ResizeEvent,
} from "@jamieowen/browser";
import { Vec } from "@thi.ng/vectors";
import { map, comp, trace } from "@thi.ng/transducers";
import { sync, reactive, Stream } from "@thi.ng/rstream";
import { Raycaster, Camera, Vector3, Plane } from "three";
import { intersectRayPlane } from "@thi.ng/geom-isec";

type GestureEvent3D = {
  gesture: GestureEvent;
  size: ResizeEvent;
  ndc: Vec;
  point: Vec;
};

type GestureEvent3DFn = (ev: GestureEvent3D) => GestureEvent3D;

const calculateNDC = (): GestureEvent3DFn => {
  console.log("create once!");
  return ({ size, gesture, ...ev }) => {
    return {
      ...ev,
      size,
      gesture,
      ndc: [
        (gesture.pos[0] / size.width) * 2.0 - 1.0,
        -(gesture.pos[1] / size.height) * 2.0 + 1.0,
      ],
    };
  };
};

/**
 * Emits a raycasted position into a gesture stream.
 * @param camera
 * @param plane
 */
export const threeRaycastPlane = (
  camera: Camera,
  plane: Plane = new Plane(new Vector3(0, 1, 0))
): GestureEvent3DFn => {
  const raycaster = new Raycaster();
  const tmp = new Vector3();
  return ({ ndc, ...ev }) => {
    tmp.fromArray(ndc);
    raycaster.setFromCamera(tmp, camera);
    raycaster.ray.intersectPlane(plane, tmp);
    return {
      ...ev,
      ndc,
      point: tmp.toArray(),
    };
  };
};

// export const thingRaycastPlane = (
//   origin: Vec,
//   direction: Vec
// ): Gestu
// const gesture = gestureStream(document.body).transform(map(() => addNDC));

/**
 * Creates a basis for a 3d gesture stream.
 * @param domElement
 * @param size
 * @param xform
 */
export const gestureStream3d = (
  domElement: HTMLElement,
  size: Stream<ResizeEvent>,
  xform?: any[]
) => {
  const stream = sync({
    src: {
      gesture: gestureStream(domElement),
      size,
    },
    // xform: comp.apply(comp, [calculateNDC(), ...xform]),
    xform: comp(map(calculateNDC()), map(xform[0])),
  });
  stream.error = (err) => {
    console.error("err", err);
    throw new Error(err);
  };
  return stream;
};

/**
 * TODO: Constrain a point in a stream to the closest point in sphere.
 * also > constrain, plane, poly, cylinder, etc.
 * Why? If we have a mouse gesture input, we can take
 * interaction event from a larger sphere, then constrain back to a
 * small one within view.  Same with plane, etc.
 * But useful to gve irregular tracking of the mouse in difference spaces.
 */
const constrainToSphere = () => {};
