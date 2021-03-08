export const ease = (amount, initial = null) => {
  let curr = initial;
  return (to) => {
    if (!curr) {
      curr = [...to];
      return curr;
    } else {
      const res = [
        curr[0] + (to[0] - curr[0] * amount),
        curr[1] + (to[1] - curr[1] * amount),
        curr[2] + (to[2] - curr[2] * amount)
      ];
      curr = res;
      return res;
    }
  };
};
