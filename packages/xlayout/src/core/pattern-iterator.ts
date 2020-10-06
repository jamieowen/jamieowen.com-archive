import { iterator, comp, map, mapcat, range2d } from "@thi.ng/transducers";
import { compilePattern, Pattern, PatternDefinition } from "./compile-pattern";

export const patternIterator = (pattern: PatternDefinition) => {
  return (rx: number = 2, ry: number = 2) =>
    iterator(
      comp(
        mapcat(([x, y]) => [
          ...map((t) => {
            return {
              id: t.id,
              w: t.w,
              h: t.h,
              x: t.x + x * pattern.width,
              y: t.y + y * pattern.height,
            };
          }, pattern.tiles),
        ])
      ),
      range2d(rx, ry)
    );
};
