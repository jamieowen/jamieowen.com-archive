import * as tx from "./@thi.ng/transducers";
import { matrixRepeater } from "./matrixRepeater";

// This also needs some kind of offset/overlap.
const hopscotchMatrix = [
  [0, 3, 6, 6],
  [0, 1, 1, 4],
  [2, 1, 1, 7],
  [8, 8, 5, 7],
];

export function hopscotch(parent, opts, create) {
  return matrixRepeater(
    parent,
    opts,
    hopscotchMatrix,
    tx.mapIndexed((i, x) => {
      return create(i, x, parent);
    })
  );
}
