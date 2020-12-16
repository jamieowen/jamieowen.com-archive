import { $compile, $list } from "@thi.ng/rdom";
import { reactive } from "@thi.ng/rstream";
import { map } from "@thi.ng/transducers";
import { Color, CSS_NAMES, parseCss, rgbaCss } from "@thi.ng/color";

import {
  complement,
  paletteGradientHSL,
  paletteShadowsHSL,
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
      width: "200px",
      height: "200px",
      display: "block",
      backgroundColor: rgbaCss(color),
    },
  },
];

const selectedColorGenerate = $list(
  selectedColor.transform(map((color) => [color])),
  "div",
  {},
  (color) => {
    const base = parseCss(color);
    // const pal = generateColorsComplement(color);
    const comp = complement(base);

    const shadows1 = paletteShadowsHSL(base);
    const shadows2 = paletteShadowsHSL(comp);
    const gradHSL = paletteGradientHSL(base, comp, 16);
    const gradRGB = paletteGradientRGB(base, comp, 16);

    return [
      "div",
      {},
      ["h1", {}, color],
      [
        "div",
        { style: { display: "flex", flexWrap: "wrap" } },
        swatch(base),
        swatch(comp),
        ...shadows1.map((col) => swatch(col)),
        ...shadows2.map((col) => swatch(col)),
        ...gradHSL.map((col) => swatch(col)),
        ...gradRGB.map((col) => swatch(col)),
      ],
    ];
  }
);

$compile([
  "div",
  {},
  ["h1", {}, "Color Complement Test"],
  ["p", {}, "Color palette generation from seed colors "],
  cssNameSelect(),
  ["div", {}, selectedColorGenerate],
]).mount(document.body);
