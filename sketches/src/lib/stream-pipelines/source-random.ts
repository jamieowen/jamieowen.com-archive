import { stream } from "@thi.ng/rstream";
import { IRandom, SYSTEM } from "@thi.ng/random";
import { AttributeEvent } from "./api";

export interface FromRandomAttributeOpts {
  count: number;
  size: number;
  rnd: IRandom;
  name: string;
  min: number;
  max: number;
}

const defaultFromRandomAttibuteOpts = (
  opts: Partial<FromRandomAttributeOpts>
): FromRandomAttributeOpts => ({
  count: 100,
  size: 3,
  rnd: SYSTEM,
  name: "position",
  min: 0,
  max: 1,
  ...opts,
});

export const fromRandomAttribute = (
  opts: Partial<FromRandomAttributeOpts> = {}
) => {
  opts = defaultFromRandomAttibuteOpts(opts);

  return stream<AttributeEvent>(($) => {
    const array = new Float32Array(opts.count * opts.size);
    for (let offset = 0; offset < opts.count * opts.size; offset += opts.size) {
      array[offset] = opts.rnd.minmax(opts.min, opts.max);
      array[offset + 1] = opts.rnd.minmax(opts.min, opts.max);
      array[offset + 2] = opts.rnd.minmax(opts.min, opts.max);
    }
    const data = {
      [opts.name]: array,
    };
    $.next({
      type: "attribute",
      data,
    });
  });
};
