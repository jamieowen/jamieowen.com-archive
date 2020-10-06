import { compilePattern } from "../src/core/compile-pattern";
import { patternIterator } from "../src/core/pattern-iterator";
import { herringbone } from "../src/core/tiling-patterns";

test("", () => {
  const pattern = compilePattern(herringbone());
  const tile = patternIterator(pattern);

  const res = [...tile()];
  const tiles = tile();
  console.log(tiles);
  // for (let t of tiles) {
  //   console.log(t);
  // }
  // res.forEach((x, i) => console.log(i, x));
});
