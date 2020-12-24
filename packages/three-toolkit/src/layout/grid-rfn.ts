import {
  range2d,
  map,
  mapcat,
  comp,
  filter,
  iterator,
} from "@thi.ng/transducers";

export type SubdivItem = [x: number, y: number, step: number, depth: number];

export const subdivRange2dIterator = (
  fromX: number,
  toX: number,
  fromY: number,
  toY: number,
  step: number,
  depth: number
) =>
  iterator(
    map<[number, number], SubdivItem>(([x, y]) => [x, y, step, depth]),
    range2d(fromX, toX, fromY, toY, step, step)
  );

export const mapSubdivide = () =>
  mapcat<SubdivItem, SubdivItem>(([x, y, step, depth]) => {
    const subStep = step * 0.5;
    return subdivRange2dIterator(x, x + step, y, y + step, subStep, depth + 1);
  });

export const mapSubdivideIf = (cond: (v: SubdivItem) => boolean) =>
  mapcat<SubdivItem, SubdivItem>((item) => {
    if (cond(item)) {
      const [x, y, step, depth] = item;
      const subStep = step * 0.5;
      return subdivRange2dIterator(
        x,
        x + step,
        y,
        y + step,
        subStep,
        depth + 1
      );
    } else {
      return [item];
    }
  });
