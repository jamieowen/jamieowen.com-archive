import {
  gestureStream
} from "../../_snowpack/pkg/@jamieowen/browser.js";
import {map, comp} from "../../_snowpack/pkg/@thi.ng/transducers.js";
import {sync} from "../../_snowpack/pkg/@thi.ng/rstream.js";
import {Raycaster, Vector3, Plane} from "../../_snowpack/pkg/three.js";
const calculateNDC = () => {
  console.log("create once!");
  return ({size, gesture, ...ev}) => {
    return {
      ...ev,
      size,
      gesture,
      ndc: [
        gesture.pos[0] / size.width * 2 - 1,
        -(gesture.pos[1] / size.height) * 2 + 1
      ]
    };
  };
};
export const threeRaycastPlane = (camera, plane = new Plane(new Vector3(0, 1, 0))) => {
  const raycaster = new Raycaster();
  const tmp = new Vector3();
  return ({ndc, ...ev}) => {
    tmp.fromArray(ndc);
    raycaster.setFromCamera(tmp, camera);
    raycaster.ray.intersectPlane(plane, tmp);
    return {
      ...ev,
      ndc,
      position: tmp.toArray()
    };
  };
};
export const gestureStream3d = (domElement, size, xform) => {
  const stream = sync({
    src: {
      gesture: gestureStream(domElement),
      size
    },
    xform: comp(map(calculateNDC()), map(xform[0]))
  });
  stream.error = (err) => {
    console.error("err", err);
    throw new Error(err);
  };
  return stream;
};
const constrainToSphere = () => {
};
