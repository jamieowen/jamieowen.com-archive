import {
  add3,
  modN3,
  sub3,
  dist3,
  copy,
  normalizeS3,
  clamp3
} from "../../../_snowpack/pkg/@thi.ng/vectors.js";
import {sync, fromRAF, reactive} from "../../../_snowpack/pkg/@thi.ng/rstream.js";
import {mapcat} from "../../../_snowpack/pkg/@thi.ng/transducers.js";
var EventType;
(function(EventType2) {
  EventType2[EventType2["TransformUpdate"] = 0] = "TransformUpdate";
  EventType2[EventType2["TransformAdd"] = 1] = "TransformAdd";
  EventType2[EventType2["TransformRemove"] = 2] = "TransformRemove";
  EventType2[EventType2["TransformArrayUpdate"] = 3] = "TransformArrayUpdate";
  EventType2[EventType2["TransformArrayAdd"] = 4] = "TransformArrayAdd";
  EventType2[EventType2["TransformArrayRemove"] = 5] = "TransformArrayRemove";
})(EventType || (EventType = {}));
export const createTransform = () => {
  return {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [0, 0, 0]
  };
};
export const fromTransform = () => reactive(createTransform());
export const toTransformEvent = (obj) => ({
  data: obj,
  type: 1
});
export const toTransformArrayEvent = (obj) => ({
  data: obj,
  type: 4
});
export const mapcatTransformArray = () => mapcat((arr) => arr.data);
export const wrapBoundsScalar = (mod) => (obj) => (modN3(void 0, obj.position, mod), obj);
export const createFrameLoop = (sources) => {
  return sync({
    src: {
      sources: reactive(sources),
      raf: fromRAF()
    },
    xform: mapcat((ev) => ev.sources)
  });
};
export const beginPhysics = () => {
  const map2 = new WeakMap();
  return (obj) => {
    let target = map2.get(obj);
    if (!target) {
      target = {
        target: obj,
        previous: obj,
        acceleration: [0, 0, 0],
        map: map2,
        velocity: [0, 0, 0]
      };
      map2.set(obj, target);
      console.log("add object", obj, target);
    }
    target.acceleration[0] = 0;
    target.acceleration[1] = 0;
    target.acceleration[2] = 0;
    return target;
  };
};
export const endPhysics = () => {
  return (obj) => {
    add3(void 0, obj.velocity, obj.acceleration);
    add3(void 0, obj.target.position, obj.velocity);
    return obj.target;
  };
};
export const forceVector = (vec) => {
  return (obj) => {
    add3(void 0, obj.acceleration, vec);
    return obj;
  };
};
export const limitVelocity = (num) => {
  const min = [-num, -num, -num];
  const max = [num, num, num];
  return (obj) => {
    clamp3(void 0, obj.velocity, min, max);
    return obj;
  };
};
export const steerRandomPoint = (threshold = 0.1) => {
  const lookup = new WeakMap();
  const force = [0, 0, 0];
  const diff = [0, 0, 0];
  return (obj) => {
    let steer = lookup.get(obj);
    if (!steer) {
      steer = {
        target: copy(obj.target.position)
      };
      lookup.set(obj, steer);
    }
    const distance = dist3(obj.target.position, steer.target);
    if (Math.abs(distance) < threshold) {
      steer.target = [Math.random() * 2, Math.random() * 2, Math.random() * 2];
    }
    normalizeS3(force, sub3(diff, steer.target, obj.target.position), 0.05);
    add3(void 0, obj.acceleration, force);
    return obj;
  };
};
