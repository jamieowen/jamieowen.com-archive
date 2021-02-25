import { filter } from "@thi.ng/transducers";

export const invalidate = <T>(
  compare: (existing: T, next: T) => boolean,
  init?: T // not sure if an init value is needed?
) => {
  let last = init;
  let first = true; // always emit first value
  return filter<T>((x) => {
    if (compare(last, x) || first) {
      last = x;
      first = false;
      return true;
    } else {
      return false;
    }
  });
};
