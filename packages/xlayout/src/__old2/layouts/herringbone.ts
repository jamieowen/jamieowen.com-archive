import * as tx from "./@thi.ng/transducers";
import { matrixRepeater } from "./matrixRepeater";

const repeatMatrix = [
  [0, 1, 0],
  [0, 1, 0],
  [2, 2, 3],
  [4, 4, 3],
];

const basketweave = [
  [1, 1, 3, 4],
  [2, 2, 3, 4],
];

// Tecnically nearly there - but we need to allow overlap/offset
// within the matrix repeater class.
const herringboneMatrix = [
  [1, 1, 4, 8, 9],
  [0, 2, 4, 7, 7],
  [0, 2, 5, 5, 10],
  [0, 3, 3, 6, 10],
];

export function herringbone(parent, opts, create) {
  return matrixRepeater(
    parent,
    opts,
    herringboneMatrix,
    tx.mapIndexed((i, x) => {
      return create(i, x, parent);
    })
  );
}
