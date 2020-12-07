import { ARandom, Smush32 } from "@thi.ng/random";
import {
  range2d,
  map,
  mapcat,
  comp,
  filter,
  iterator,
} from "@thi.ng/transducers";
/**
 * Iterator that extends the standard range2d but emits the step and a depth.
 */
export type RangeItem = [x: number, y: number, step: number, depth: number];

export const range2dStepDepth = (
  fromX: number,
  toX: number,
  fromY: number,
  toY: number,
  step: number,
  depth: number
) =>
  iterator(
    map<any, RangeItem>(([x, y]) => [x, y, step, depth]),
    range2d(fromX, toX, fromY, toY, step, step)
  );

/**
 * Subdivide a RangeItem.
 */
export const subdivide = () =>
  mapcat<RangeItem, RangeItem>(([x, y, step, depth]) => {
    const subStep = step * 0.5;
    return range2dStepDepth(x, x + step, y, y + step, subStep, depth + 1);
  });

export const subdivideIf = (cond: (v: RangeItem) => boolean) =>
  mapcat<RangeItem, RangeItem>((item) => {
    if (cond(item)) {
      const [x, y, step, depth] = item;
      const subStep = step * 0.5;
      return range2dStepDepth(x, x + step, y, y + step, subStep, depth + 1);
    } else {
      return [item];
    }
  });

export const gridIterator = (
  gridSize: number = 256,
  screenWidth: number = 1280,
  screenHeight: number = 800
) => {
  const random = new Smush32(0x002312);
  const gw = Math.ceil(screenWidth / gridSize);
  const gh = Math.ceil(screenHeight / gridSize);

  return iterator(
    comp(
      map((v) => v),
      filter((v) => random.float() > 0.3),
      subdivideIf((item) => {
        return random.float() > 0.5 ? true : false;
      }),
      subdivideIf((item) => {
        return random.float() > 0.5 ? true : false;
      }),
      filter((v) => random.float() > 0.3)
    ),
    range2dStepDepth(0, gw, 0, gh, 1, 0)
  );
};
