import React, { FC, createContext, useMemo, useContext } from "react";
import { gridIterator, RangeItem } from "./grid-iteration";
import { Smush32 } from "@thi.ng/random";

export interface GenerativeGrid {
  size: number;
  seed: number;
  random: Smush32;
  grid: RangeItem[];
}

// export interface GridItem {
//   depth: number;
//   width: number;
//   height: number;
//   x: number;
//   y: number;
//   id: number;
// }

// type IdxDepth = [[number, number], number];
// const gridItem = (depth: number = 0, size: number, xo: number, yo: number) =>
//   map<Idx, GridItem>(([x, y]) => ({
//     depth,
//     x: size * x + xo,
//     y: size * y + yo,
//     width: size,
//     height: size,
//     id: 0,
//   }));

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

// const mapSubdivItem = ([x, y]) => [x, y, 1, 0]; // add step & depth at the end.
// const subdivide = ()=> mapcat(()=>iterator(map(mapSubdivItem), range2d(2,2) )

// for (let ii of i) {
//   console.log(ii);
// }

// console.log("ITERANLE", i);

export const GenerativeGridContext = createContext<GenerativeGrid>(null!);
export const useGenerativeGrid = () => useContext(GenerativeGridContext);
export const GenerativeGridProvider: FC<any> = ({ children }) => {
  const grid: GenerativeGrid = useMemo(() => {
    const screenWidth = 2048;
    const screenHeight = 2048;
    const size = 512;
    const seed = 0xff1234;
    const random = new Smush32(seed);

    const grid = [...gridIterator(size, screenWidth, screenHeight)];
    return {
      size,
      seed,
      random,
      grid,
    };
  }, []);

  return (
    <GenerativeGridContext.Provider value={grid}>
      {children}
    </GenerativeGridContext.Provider>
  );
};
