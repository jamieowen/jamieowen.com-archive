import {Stream, reactive} from "../../../_snowpack/pkg/@thi.ng/rstream.js";
import {implementsFunction} from "../../../_snowpack/pkg/@thi.ng/checks.js";
export const isSubscribable = (x) => implementsFunction(x, "subscribe");
export function optsStream(opts) {
  if (!isSubscribable(opts)) {
    return reactive(opts);
  } else {
    return opts;
  }
}
export const createRandomPoints = (id, opts = {}) => {
  const inputs = reactive({
    count: 10,
    seed: 0,
    ...opts
  });
  const stream$ = new Stream((src) => {
    const sub = inputs.subscribe({
      next: (inp) => {
        const arr = new Array(inp.count).fill(0).map(() => dataToPointEvent([Math.random(), Math.random(), Math.random()]));
        src.next(arr);
      }
    });
    return () => {
      sub.unsubscribe();
    };
  }, {});
  return [stream$, inputs];
};
export const dataToPointEvent = (data) => {
  return {
    data,
    type: "point"
  };
};
