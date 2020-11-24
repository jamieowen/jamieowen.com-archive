import React, { FC, createContext, useMemo } from "react";
import {
  range2d,
  mapcat,
  transduce,
  filter,
  map,
  iterator,
  comp,
  min,
} from "@thi.ng/transducers";
import { Smush32 } from "@thi.ng/random";

export interface GenerativeGrid {
  seed: number;
  random: Smush32;
  grid: GridItem[];
}

export interface GridItem {
  depth: number;
  width: number;
  height: number;
  x: number;
  y: number;
  id: number;
}

type IdxDepth = [[number, number], number];
const gridItem = (depth: number = 0, size: number, xo: number, yo: number) =>
  map<Idx, GridItem>(([x, y]) => ({
    depth,
    x: size * x + xo,
    y: size * y + yo,
    width: size,
    height: size,
    id: 0,
  }));

// 1,1,  1 * 0.5 ( )
// const subdivide = (rand: Smush32) =>
//   comp<IdxDepth, IdxDepth>(
//     filter(() => rand.float() > 0.5),
//     mapcat(([[x, y], depth]) => {
//       if (rand.float() > 0.5) {
//         return range2d(2, 2);
//       } else {
//         return [[[x, y], depth + 1]];
//       }
//     })
//   );

// mapcat((v) => {
//   console.log(v);
// if (random.float() > 0.5) {
//   // return
//   return [...range2d(2, 2)];
// } else {
//   return [v];
// }
// })

/**
 * Iterator that extends the standard range2d but emits the step and a depth.
 */
type RangeItem = [x: number, y: number, step: number, depth: number];

const range2dStepDepth = (
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
const subdivide = () =>
  mapcat<RangeItem, RangeItem>(([x, y, step, depth]) => {
    const subStep = step * 0.5;
    return range2dStepDepth(x, x + step, y, y + step, subStep, depth + 1);
  });

console.log("Test ");
const items = iterator(
  map((v) => v),
  range2dStepDepth(0, 2, 0, 2, 1, 0)
);

for (let item of items) {
  console.log("Item ::", item);
}

console.log("Range Iterator");

const rang = range2dStepDepth(0, 2, 0, 2, 1, 0);
for (let r of rang) {
  console.log("R", r);
}

console.log("Sub Iterator");
const sub = iterator(subdivide(), range2dStepDepth(0, 2, 0, 2, 1, 0));

console.log("Sub..");
for (let s of sub) {
  console.log("S", s);
}

// const mapSubdivItem = ([x, y]) => [x, y, 1, 0]; // add step & depth at the end.
// const subdivide = ()=> mapcat(()=>iterator(map(mapSubdivItem), range2d(2,2) )

// for (let ii of i) {
//   console.log(ii);
// }

// console.log("ITERANLE", i);

export const GenerativeGridContext = createContext<GenerativeGrid>(null!);
export const GenerativeGridProvider: FC<any> = ({ children }) => {
  const grid: GenerativeGrid = useMemo(() => {
    const screenWidth = 1280;
    const screenHeight = 800;
    const gridSize = 256;
    const gw = Math.ceil(screenWidth / gridSize);
    const gh = Math.ceil(screenHeight / gridSize);

    const seed = 0xff1234;
    const random = new Smush32(seed);

    return {
      seed,
      random,
      grid: [
        ...iterator(
          comp(
            // gridItem(0, gridSize, 0, 0),
            map((xy) => [xy, 0]) // add depth
            // subdivide(random)
          ),
          range2d(gw, gh)
        ),
      ],
    };
  }, []);
  console.log("GRID : ", grid);
  return (
    <GenerativeGridContext.Provider value={grid}>
      {children}
    </GenerativeGridContext.Provider>
  );
};
