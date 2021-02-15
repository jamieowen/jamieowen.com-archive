import { stream } from "@thi.ng/rstream";
import { stratifiedGrid } from "@thi.ng/poisson";
import { KdTreeSet } from "@thi.ng/geom-accel";
import { AttributeEvent } from "./api";

export const fromPoissonPoints = (count: number) => {
  const sqrt = Math.sqrt(count);
  if (Math.round(sqrt) !== sqrt) {
    throw new Error("Count must be squared");
  }
  return stream<AttributeEvent>(($) => {
    const grid = stratifiedGrid({ dim: [sqrt, sqrt], samples: 1 });
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
        position,
      },
    });

    return () => {};
  }, {});
};
