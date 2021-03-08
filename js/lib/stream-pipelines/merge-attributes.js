import {sync} from "../../../_snowpack/pkg/@thi.ng/rstream.js";
import {map} from "../../../_snowpack/pkg/@thi.ng/transducers.js";
export const mergeAttributes = (...args) => {
  const src = args.reduce((obj, str, i) => {
    obj[i] = str;
    return obj;
  }, {});
  return sync({
    src,
    xform: map((src2) => {
      let data = {};
      for (let key in src2) {
        const str = src2[key];
        data = {
          ...data,
          ...str.data
        };
      }
      return {
        data,
        type: "attribute"
      };
    })
  });
};
