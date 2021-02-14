import { sync, Stream } from "@thi.ng/rstream";
import { map } from "@thi.ng/transducers";

import { AttributeEvent } from "./api";

export const mergeAttributes = (...args: Stream<AttributeEvent>[]) => {
  const src = args.reduce((obj, str, i) => {
    obj[i] = str;
    return obj;
  }, {} as any);
  return sync<Record<string, Stream<AttributeEvent>>, AttributeEvent>({
    src,
    xform: map((src) => {
      let data = {};
      for (let key in src) {
        const str = src[key];
        data = {
          ...data,
          ...str.data,
        };
      }
      return {
        data,
        type: "attribute",
      };
    }),
  });
};
