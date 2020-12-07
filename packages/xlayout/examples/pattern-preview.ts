import { $compile, $list } from "@thi.ng/rdom";
import { reactive, sync } from "@thi.ng/rstream";
import { mapcat, take, map } from "../src/__old2/layouts/@thi.ng/transducers";
import { compilePattern, Tile } from "../src/core/compile-pattern";
import { patternIterator } from "../src/core/pattern-iterator";
import {
  baseketweaveIterator,
  basketweave,
  herringbone,
  herringboneIterator,
  hopscotch,
  hopscotchIterator,
  windmill,
  windmillIterator,
} from "../src/core/tiling-patterns";

/** Make some custom patterns.. */
const pattern = [
  [0, 0, 1, 1],
  [2, 2, 3, 4],
  [2, 2, 3, 4],
];

const patterns = {
  // ["test-pattern"]: pattern,
  windmill: windmill(),
  basketweave: basketweave(),
  hopscotch: hopscotch(),
  herringbone: herringbone(),
};

const patternIterators = {
  windmill: windmillIterator,
  basketweave: baseketweaveIterator,
  hopscotch: hopscotchIterator,
  herringbone: herringboneIterator,
};

const activePattern = reactive("herringbone");
const compiledPattern = activePattern.transform(
  map((p) => compilePattern(patterns[p]))
);

const activeTiles = compiledPattern.transform(map((p) => p.tiles));
const activeIterator = activePattern.transform(map((p) => patternIterators[p]));

const rangeX = reactive(2);
const rangeY = reactive(2);
const maxCount = reactive(100);
const scale = 30;

const activeIteratorTiles = sync({
  src: { activeIterator, rangeX, rangeY, maxCount, compiledPattern },
}).transform(
  map(({ activeIterator, maxCount, rangeX, rangeY, compiledPattern }) => [
    ...take(
      Math.round(
        (maxCount / 100) * compiledPattern.tiles.length * (rangeX * rangeY)
      ),
      activeIterator(rangeX, rangeY)
    ),
  ])
);

const renderTile = (color: string) => (t: Tile) => [
  "div",
  {
    style: {
      position: "absolute",
      backgroundColor: color,
      boxSizing: "border-box",
      border: "0.5px solid white",
      width: `${t.w * scale}px`,
      height: `${t.h * scale}px`,
      top: `${t.y * scale}px`,
      left: `${t.x * scale}px`,
    },
  },
];
const renderTiles = $list(
  activeTiles,
  "div",
  {
    style: {
      position: "relative",
      margin: "100px",
    },
  },
  renderTile("blue")
);

const renderIteratorTiles = $list(
  activeIteratorTiles,
  "div",
  {
    style: {
      position: "relative",
      marginLeft: "500px",
      backgroundColor: "#efefef",
    },
  },
  renderTile("red")
);

const renderInput = (reactive: any, max: number, title: string) => {
  return [
    "div",
    {},
    ["div", {}, reactive.transform(map((t: any) => `${title}:${t}`))],
    [
      "input",
      {
        type: "range",
        min: 0,
        max: max,
        value: reactive,
        oninput: (ev: Event) => {
          const target = ev.target as HTMLInputElement;
          reactive.next(target.value);
        },
      },
    ],
  ];
};

const renderSelect = () => [
  "select",
  {
    id: activePattern.deref(),
    onchange: (ev: Event) => {
      const target = ev.target as HTMLSelectElement;
      activePattern.next(target.value);
    },
  },
  ...Object.keys(patterns).map((p) => [
    "option",
    { value: p, selected: p === activePattern.deref() },
    p,
  ]),
];

$compile([
  "div",
  {},
  ["h1", {}, activePattern.transform(map((p) => `Pattern : ${p}`))],
  renderSelect(),
  renderInput(rangeX, 10, "Grid X"),
  renderInput(rangeY, 10, "Grid Y"),
  renderInput(maxCount, maxCount.deref(), "Iterate Max:"),
  renderTiles,
  renderIteratorTiles,
]).mount(document.body);
