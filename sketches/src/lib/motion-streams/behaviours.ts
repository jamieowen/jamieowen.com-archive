import { reactive } from "@jamieowen/motion";
import {
  add3,
  set3,
  setN3,
  setC3,
  Vec,
  clamp11,
  modN3,
  sub3,
  subN3,
  dist3,
  copy,
  normalizeS3,
  clamp11_3,
  clamp3,
} from "@thi.ng/vectors";
import { sync, fromRAF } from "@thi.ng/rstream";
import { mapcat, map } from "@thi.ng/transducers";

// Source objects would look like:
export interface ITransform {
  position: Vec;
  rotation: Vec;
  scale: Vec;
}

export interface IAccumulation {
  map: WeakMap<ITransform, IAccumulation>;
  target: ITransform;
  previous: ITransform;
  velocity: Vec;
  acceleration: Vec;
}

export const createTransform = (): ITransform => {
  return {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [0, 0, 0],
  };
};

export const fromTransform = () => reactive<ITransform>(createTransform());

export const wrapBoundsScalar = (mod: number) => (obj: ITransform) => (
  modN3(undefined, obj.position, mod), obj
);

// export const wrapBoundsScalar = (mod: number, offset: number = 0) => (
//   obj: ITransform
// ) => (subN3(undefined, modN3(undefined, obj.position, mod), offset), obj);

export const createFrameLoop = (sources: ITransform[]) => {
  return sync({
    src: {
      sources: reactive(sources),
      raf: fromRAF(),
    },
    xform: mapcat((ev) => ev.sources),
  });
};
/**
 * At a given point in the pipeline a beginPhysics() is
 * called. This 'upcasts' the object to begin receving forces.
 * we don't want however, to recreate the upcasted object each time,
 * we want to reuse the object, so we need a weak map to handle them.
 */
export const beginPhysics = () => {
  const map = new WeakMap<ITransform, IAccumulation>();

  /**
   * Receive a transform object and 'upcast' to
   * a new type capable of storing physics vars.
   */
  return (obj: ITransform) => {
    let target = map.get(obj);
    // create cached object.
    if (!target) {
      target = <IAccumulation>{
        target: obj,
        previous: obj, // copy / create
        acceleration: [0, 0, 0],
        map: map,
        velocity: [0, 0, 0],
      };
      map.set(obj, target);
      console.log("add object", obj, target);
    }

    // reset acceleration? Or does acelleration acculmulate???
    target.acceleration[0] = 0;
    target.acceleration[1] = 0;
    target.acceleration[2] = 0;

    // copy previous transform ?
    // or store seperate velocity?
    // it would be handy to have whole transform to apply forces to rotation, scale, etc
    return target;
  };
};

/**
 * This completes the physics accumulation steps, applies
 * the forces to the object and returns the original transform
 * pased into the beginPhysics step.
 */
export const endPhysics = () => {
  return (obj: IAccumulation) => {
    // add acceleration to velocity
    // add velocity to position.
    add3(undefined, obj.velocity, obj.acceleration);
    add3(undefined, obj.target.position, obj.velocity);
    return obj.target;
  };
};

export const forceVector = (vec: Vec) => {
  return (obj: IAccumulation) => {
    add3(undefined, obj.acceleration, vec);
    return obj;
  };
};

export const limitVelocity = (num: number) => {
  const min = [-num, -num, -num];
  const max = [num, num, num];

  return (obj: IAccumulation) => {
    // clamp11_3(undefined,obj.velocity,vec,)
    clamp3(undefined, obj.velocity, min, max);
    return obj;
  };
};

/**
 * Steering force accunulation for multiple potential objects.
 */
export const steerRandomPoint = (threshold: number = 0.1) => {
  const lookup = new WeakMap<
    IAccumulation,
    {
      target: Vec;
    }
  >();
  const force = [0, 0, 0];
  const diff = [0, 0, 0];
  return (obj: IAccumulation) => {
    // get data for object..
    let steer = lookup.get(obj);
    if (!steer) {
      steer = {
        target: copy(obj.target.position), // copy position of target
      };
      lookup.set(obj, steer);
    }
    const distance = dist3(obj.target.position, steer.target);
    if (Math.abs(distance) < threshold) {
      steer.target = [Math.random() * 2, Math.random() * 2, Math.random() * 2];
    }
    normalizeS3(force, sub3(diff, steer.target, obj.target.position), 0.05);
    add3(undefined, obj.acceleration, force);

    return obj;
  };
};
