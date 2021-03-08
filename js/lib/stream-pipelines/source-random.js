import {stream} from "../../../_snowpack/pkg/@thi.ng/rstream.js";
import {SYSTEM} from "../../../_snowpack/pkg/@thi.ng/random.js";
const defaultFromRandomAttibuteOpts = (opts) => ({
  count: 100,
  size: 3,
  rnd: SYSTEM,
  name: "position",
  min: 0,
  max: 1,
  ...opts
});
export const fromRandomAttribute = (opts = {}) => {
  opts = defaultFromRandomAttibuteOpts(opts);
  return stream(($) => {
    const array = new Float32Array(opts.count * opts.size);
    for (let offset = 0; offset < opts.count * opts.size; offset += opts.size) {
      array[offset] = opts.rnd.minmax(opts.min, opts.max);
      array[offset + 1] = opts.rnd.minmax(opts.min, opts.max);
      array[offset + 2] = opts.rnd.minmax(opts.min, opts.max);
    }
    const data = {
      [opts.name]: array
    };
    $.next({
      type: "attribute",
      data
    });
  });
};
