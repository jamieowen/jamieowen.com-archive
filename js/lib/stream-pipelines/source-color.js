import {stream} from "../../../_snowpack/pkg/@thi.ng/rstream.js";
import {colorsFromRange, COLOR_RANGES} from "../../../_snowpack/pkg/@thi.ng/color.js";
export const fromColorGradient = (count) => {
  return stream(($) => {
    const color = new Float32Array(count * 4);
    const sample = colorsFromRange(COLOR_RANGES.fresh);
    let offset = 0;
    for (let i = 0; i < count; i++) {
      const rgba = sample.next();
      const val = rgba.value;
      color[offset] = val[0];
      color[offset + 1] = val[1];
      color[offset + 2] = val[2];
      color[offset + 3] = val[3];
      offset += 4;
    }
    $.next({
      type: "attribute",
      data: {
        color
      }
    });
  });
};
