import {stream} from "../../../_snowpack/pkg/@thi.ng/rstream.js";
import {stratifiedGrid} from "../../../_snowpack/pkg/@thi.ng/poisson.js";
import {KdTreeSet} from "../../../_snowpack/pkg/@thi.ng/geom-accel.js";
export const fromPoissonPoints = (count) => {
  const sqrt = Math.sqrt(count);
  if (Math.round(sqrt) !== sqrt) {
    throw new Error("Count must be squared");
  }
  return stream(($) => {
    const grid = stratifiedGrid({dim: [sqrt, sqrt], samples: 1});
    const index = new KdTreeSet(2);
    index.into(grid);
    const position = new Float32Array(index.size * 3);
    let offset = 0;
    for (let pnt of index.keys()) {
      position[offset] = pnt[0];
      position[offset + 1] = pnt[1];
      position[offset + 2] = 0;
      offset += 3;
    }
    $.next({
      type: "attribute",
      data: {
        position
      }
    });
    return () => {
    };
  }, {});
};
