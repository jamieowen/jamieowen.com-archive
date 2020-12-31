import { $compile, $list } from "@thi.ng/rdom";
import { reactive } from "@thi.ng/rstream";
import { map } from "@thi.ng/transducers";
import { Color, CSS_NAMES, parseCss, rgbaCss } from "@thi.ng/color";

import {
  complement,
  paletteGradientHSL,
  paletteColorRangeHSL,
  paletteGradientRGB,
} from "@jamieowen/three-toolkit";

const selectedColor = reactive("crimson");

const cssNameSelect = () => [
  "select",
  {
    onchange: (ev: any) => {
      selectedColor.next(ev.target.value);
    },
  },
  ...Object.keys(CSS_NAMES).map((key) => [
    "option",
    { value: key, selected: key === selectedColor.deref() },
    key,
  ]),
];

const swatch = (color: Color) => [
  "div",
  {
    style: {
      width: "50px",
      height: "50px",
      display: "block",
      backgroundColor: rgbaCss(color),
    },
  },
];

const swatches = (colors: Color[]) => colors.map(swatch);

const flexGrid = (children: any[]) => [
  "div",
  { style: { display: "flex", flexWrap: "wrap" } },
  ...children,
];

const container = (children: any) => ["div", {}, ...children];
const p = (text: string) => ["p", {}, text];
const h2 = (title: string) => ["h2", {}, title];
const swatchTitle = (title: string, text: string, colors: Color[]) => [
  "div",
  {},
  h2(title),
  p(text),
  flexGrid(colors.map(swatch)),
];

const selectedColorGenerate = $list(
  selectedColor.transform(map((color) => [color])),
  "div",
  {},
  (color) => {
    const base = parseCss(color);
    // const pal = generateColorsComplement(color);
    const comp = complement(base);

    // Clamp
    const range1 = paletteColorRangeHSL(base, {
      scale: 1,
      range: 1,
      saturation: 1,
      steps: 13,
    });
    // No clamp
    const range2 = paletteColorRangeHSL(base, {
      scale: 1,
      range: 0.5,
      saturation: 1,
      steps: 13,
      clamp: [-5, 5],
    });
    const range3 = paletteColorRangeHSL(base, {
      scale: 1,
      range: 0.3,
      saturation: 1,
      steps: 13,
      clamp: [-5, 5],
    });
    const shadows2 = paletteColorRangeHSL(comp);
    // const gradHSL = paletteGradientHSL(base, comp, 16);
    // const gradRGB = paletteGradientRGB(base, comp, 16);

    return [
      "div",
      {},
      ["h1", {}, color],
      swatchTitle("Base / Complement", "Generate complement from base color", [
        base,
        comp,
      ]),
      swatchTitle(
        "Base Range 1",
        "Generate base ranged palette with +1/-1 on L. ( Clamped [0,1] ) ",
        range1
      ),
      swatchTitle(
        "Base Range 2",
        "Generate base ranged palette with +0.5/-0.5 on L. ( No Clamp [-5,5] ) ",
        range2
      ),
      swatchTitle(
        "Base Range 3",
        "Generate base ranged palette with +0.3/-0.3 on L. ( No Clamp [-5,5] ) ",
        range3
      ),
      swatchTitle("Complement Shadows", "", shadows2),
    ];
  }
);

$compile([
  "div",
  {
    style: { backgroundColor: "#efefef" },
  },
  ["h1", {}, "Color Palette Generation Tools"],
  ["p", {}, "Testing different generation tools."],
  cssNameSelect(),
  ["div", {}, selectedColorGenerate],
]).mount(document.body);
