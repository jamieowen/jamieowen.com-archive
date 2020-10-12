import * as tx from "./@thi.ng/transducers";
import { Node } from "../nodes";
import { GridOpts } from "./grid";
import { CreateChild } from "./subdivide";
import { repeater } from "./repeater";

export function windmill(parent: Node, opts?: GridOpts, create?: CreateChild) {
  const D3 = 0.3333333333;
  const D6 = 0.6666666666;

  // const D3 = 0.4;
  // const D6 = 0.6;

  const tl = (x) => {
    const w = x.w * D6;
    const h = x.h * D3;
    return {
      x: x.x,
      y: x.y,
      w: w,
      h: h,
    };
  };
  const tr = (x) => {
    const w = x.w * D3;
    const h = x.h * D6;
    return {
      ...x,
      x: x.x + x.w - w,
      w: w,
      h: h,
    };
  };
  const br = (x) => {
    const w = x.w * D6;
    const h = x.h * D3;
    return {
      x: x.x + x.w - w,
      y: x.y + x.h - h,
      w: w,
      h: h,
    };
  };

  const bl = (x) => {
    const w = x.w * D3;
    const h = x.h * D6;
    return {
      ...x,
      y: x.y + x.h - h,
      w: w,
      h: h,
    };
  };

  const center = (x) => {
    const xx = x.w * D3;
    const yy = x.h * D3;
    const w = x.w - 2 * x.w * D3;
    const h = x.h - 2 * x.h * D3;

    return {
      x: x.x + xx,
      y: x.y + yy,
      w: w,
      h: h,
    };
  };

  const cyc = [tl, tr, br, bl, center];

  const xform = tx.mapIndexed((i, x) => {
    x = cyc[x.ir](x);
    return create(i, x, parent);
  });

  return repeater(parent, 5, opts, xform);
}
