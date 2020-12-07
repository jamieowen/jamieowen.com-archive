import { Pattern, compilePattern } from "./compile-pattern";
import { patternIterator } from "./pattern-iterator";
// Needs some overlap
export const herringbone = (): Pattern => [
  [1, 1, 4, 8, 9],
  [0, 2, 4, 7, 7],
  [0, 2, 5, 5, 10],
  [0, 3, 3, 6, 10],
];
export const herringboneIterator = patternIterator(
  compilePattern(herringbone())
);

export const basketweave = (): Pattern => [
  [1, 1, 3, 4],
  [2, 2, 3, 4],
];
export const baseketweaveIterator = patternIterator(
  compilePattern(basketweave())
);

// Needs overlapping..
export const hopscotch = (): Pattern => [
  [0, 3, 6, 6],
  [0, 1, 1, 4],
  [2, 1, 1, 7],
  [8, 8, 5, 7],
];
export const hopscotchIterator = patternIterator(compilePattern(hopscotch()));

export const windmill = (): Pattern => [
  [0, 0, 1],
  [3, 2, 1],
  [3, 4, 4],
];
export const windmillIterator = patternIterator(compilePattern(windmill()));

export const grid = (): Pattern => [[0]];
