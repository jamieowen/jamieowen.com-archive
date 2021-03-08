import {$compile, $list} from "../../_snowpack/pkg/@thi.ng/rdom.js";
import {reactive} from "../../_snowpack/pkg/@thi.ng/rstream.js";
import {map} from "../../_snowpack/pkg/@thi.ng/transducers.js";
import {CSS_NAMES, parseCss, rgbCss} from "../../_snowpack/pkg/@thi.ng/color.js";
import {
  complement,
  paletteColorRangeHSL
} from "../../_snowpack/pkg/@jamieowen/color.js";
const selectedColor = reactive("crimson");
const cssNameSelect = () => [
  "select",
  {
    onchange: (ev) => {
      selectedColor.next(ev.target.value);
    }
  },
  ...Object.keys(CSS_NAMES).map((key) => [
    "option",
    {value: key, selected: key === selectedColor.deref()},
    key
  ])
];
const swatch = (color) => [
  "div",
  {
    style: {
      width: "50px",
      height: "50px",
      display: "block",
      backgroundColor: rgbCss(color)
    }
  }
];
const swatches = (colors) => colors.map(swatch);
const flexGrid = (children) => [
  "div",
  {style: {display: "flex", flexWrap: "wrap"}},
  ...children
];
const container = (children) => ["div", {}, ...children];
const p = (text) => ["p", {}, text];
const h2 = (title) => ["h2", {}, title];
const swatchTitle = (title, text, colors) => [
  "div",
  {},
  h2(title),
  p(text),
  flexGrid(colors.map(swatch))
];
const selectedColorGenerate = $list(selectedColor.transform(map((color) => [color])), "div", {}, (color) => {
  const base = parseCss(color);
  const comp = complement(base.deref());
  const range1 = paletteColorRangeHSL(base.deref(), {
    scale: 1,
    range: 1,
    saturation: 1,
    steps: 13
  });
  const range2 = paletteColorRangeHSL(base.deref(), {
    scale: 1,
    range: 0.5,
    saturation: 1,
    steps: 13,
    clamp: [-5, 5]
  });
  const range3 = paletteColorRangeHSL(base.deref(), {
    scale: 1,
    range: 0.3,
    saturation: 1,
    steps: 13,
    clamp: [-5, 5]
  });
  const shadows2 = paletteColorRangeHSL(comp);
  return [
    "div",
    {},
    ["h1", {}, color],
    swatchTitle("Base / Complement", "Generate complement from base color", [
      base.deref(),
      comp
    ]),
    swatchTitle("Base Range 1", "Generate base ranged palette with +1/-1 on L. ( Clamped [0,1] ) ", range1),
    swatchTitle("Base Range 2", "Generate base ranged palette with +0.5/-0.5 on L. ( No Clamp [-5,5] ) ", range2),
    swatchTitle("Base Range 3", "Generate base ranged palette with +0.3/-0.3 on L. ( No Clamp [-5,5] ) ", range3),
    swatchTitle("Complement Shadows", "", shadows2)
  ];
});
$compile([
  "div",
  {
    style: {backgroundColor: "#efefef"}
  },
  ["h1", {}, "Color Palette Generation Tools"],
  ["p", {}, "Testing different generation tools."],
  cssNameSelect(),
  ["div", {}, selectedColorGenerate]
]).mount(document.body);
