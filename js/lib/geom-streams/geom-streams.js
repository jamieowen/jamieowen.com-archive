import {
  sync,
  reactive
} from "../../../_snowpack/pkg/@thi.ng/rstream.js";
import {map} from "../../../_snowpack/pkg/@thi.ng/transducers.js";
export class RandomPoints {
  constructor(id = "", opts) {
    this.id = id;
    this.opts = reactive(opts);
    this.stream = sync({
      src: {
        opts: this.opts
      },
      xform: map(({opts: opts2}) => {
        return new Array(opts2.count).fill(0).map(() => [Math.random(), Math.random(), Math.random()]);
      })
    });
  }
}
export const fromRandomPoints = (id, opts) => {
  return new RandomPoints(id, opts);
};
const fromGridPoints = () => {
};
const fromGeometry = () => {
};
