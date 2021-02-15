import { stream } from "@thi.ng/rstream";
import { colorsFromRange, RANGES } from "@thi.ng/color";
import { Vec } from "@thi.ng/vectors";
import { AttributeEvent } from "./api";

export const fromColorGradient = (count: number) => {
  return stream<AttributeEvent>(($) => {
    const color = new Float32Array(count * 4);
    const sample = colorsFromRange(RANGES.fresh);
    let offset = 0;
    for (let i = 0; i < count; i++) {
      const rgba = sample.next();
      const val = rgba.value as Vec;
      color[offset] = val[0];
      color[offset + 1] = val[1];
      color[offset + 2] = val[2];
      color[offset + 3] = val[3];
      offset += 4;
    }
    $.next({
      type: "attribute",
      data: {
        color,
      },
    });
  });
};
