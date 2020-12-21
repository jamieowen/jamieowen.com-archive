import { fromRAF, sync, ISubscribable, reactive } from "@thi.ng/rstream";
import { comp, map } from "@thi.ng/transducers";
import { Vec3Like, mixN3 } from "@thi.ng/vectors";

export * from "./types";
export * from "./particle";
export * from "./gesture-drag";
/**
 * Ideas / Notes.
 *
 * WIP notes on motion based streams. These are really to
 * create some simple compasable streams that can generate some
 * varying movement styles.
 *
 * Some points:
 * 1. How best to define a config? Configs could be quite generic so could be seperate streams that
 * can be passed into common stream types.
 * 2. Transform stream. A base stream that all motion streams could use or be passed. similar to the RAF stream.
 * Essentially position,scale & rotation can be passed in to all streams?
 * ORRR this us likely not needd. a transformStream to map the ouput Vec3 is all thats
 * probably needed.
 * 3. Blend Stream Types.
 * 4. Noise and Randomiser Streams.
 * 5. Random Walk, Meander, Bounds based motion.
 * 6. Bayrcentric interpolation between multiple streams.
 * 7. Curve streams, Geometry, Typograhy?
 * 8. History / Buffer
 * 9. Gesture? Throw / Drag / Etc with Inertia
 */

/**
 * Export reactive helper for wrapping motion config objects.
 */
export const motionConfig = reactive;

/**
 * Base composable tween like stream emitting some customisable motion style.
 * @param update
 * @param config
 * @param raf
 */
export function motionStream<C = any, T = Vec3Like>(
  update: (time: number, cfg: C) => T,
  config: ISubscribable<C>,
  raf: ISubscribable<number> = fromRAF()
) {
  return sync({
    src: {
      cfg: config,
      raf,
    },
    xform: comp(map(({ raf, cfg }) => update(raf, cfg))),
  });
}

export type RadialMotionConfig = {
  radius: number;
  speed: number;
};
export function motionRadialOrbit(
  config: ISubscribable<RadialMotionConfig>,
  raf?: ISubscribable<number>
) {
  // https://gamedev.stackexchange.com/questions/43691/how-can-i-move-an-object-in-an-infinity-or-figure-8-trajectory
  return motionStream<RadialMotionConfig>(
    (t, cfg) => {
      t *= cfg.speed;
      const x = Math.cos(t) * cfg.radius;
      const y = Math.sin(t) * cfg.radius;
      return [x, 0, y];
    },
    config,
    raf
  );
}

export function motionFigure8Orbit(
  config: ISubscribable<RadialMotionConfig>,
  raf?: ISubscribable<number>
) {
  // https://gamedev.stackexchange.com/questions/43691/how-can-i-move-an-object-in-an-infinity-or-figure-8-trajectory
  return motionStream<RadialMotionConfig>(
    (t, cfg) => {
      t *= cfg.speed;
      const scale = 2 / (3 - Math.cos(2 * t));
      const x = scale * Math.cos(t);
      const y = (scale * Math.sin(2 * t)) / 2;
      return [x * cfg.radius, 0, y * cfg.radius];
    },
    config,
    raf
  );
}

export const motionBlend = (blend: number, a, b) =>
  sync({
    src: {
      a,
      b,
    },
    xform: map(({ a, b }) => {
      return mixN3([], a, b, blend);
    }),
  });
