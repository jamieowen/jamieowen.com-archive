import { sync, ISubscribable, reactive } from "@thi.ng/rstream";
import { comp, map } from "@thi.ng/transducers";
import { Vec3Like, mixN3 } from "@thi.ng/vectors";
import { motionStream } from "./motion-stream";
import { DEFAULT_RAF_STREAM } from "./types";

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
