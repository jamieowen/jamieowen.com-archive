import { fromRAF, CommonOpts } from "@thi.ng/rstream";
import { map } from "@thi.ng/transducers";

export const clock = (opts?: CommonOpts) => {
  let then = performance.now();
  return fromRAF(opts).transform(
    map((frame) => {
      const now = performance.now();
      const delta = then - now;
      then = now;
      return { frame, delta };
    })
  );
};

export const DEFAULT_CLOCK = (() => {
  let instance: ReturnType<typeof clock> = undefined;
  return () => {
    if (!instance) {
      instance = clock();
    }
    return instance;
  };
})();
