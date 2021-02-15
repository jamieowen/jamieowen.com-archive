import { Vec } from "@thi.ng/vectors";
/**
 * TODO: a stream based Spring.
 * @param src
 */
// const spring = (src: Stream<Vec>) => {};

export const ease = (amount: number, initial: Vec = null) => {
  let curr: Vec = initial;
  return (to: Vec) => {
    if (!curr) {
      curr = [...to];
      return curr;
    } else {
      const res = [
        curr[0] + (to[0] - curr[0] * amount),
        curr[1] + (to[1] - curr[1] * amount),
        curr[2] + (to[2] - curr[2] * amount),
      ];
      curr = res;
      return res;
    }
  };
};
