import { $compile, $list } from "@thi.ng/rdom";
import { reactive } from "@thi.ng/rstream";
import { map } from "@thi.ng/transducers";
import {
  CSS_NAMES,
  closestHue,
  closestPrimaryHue,
  parseCss,
  rgbCss,
  rgbHsv,
  ColorMode,
  namedHueRgb,
  luminance,
} from "@thi.ng/color";
import { complement, contrastRatio2 } from "@jamieowen/color";

const blockStyle = {
  width: "200px",
  height: "40px",
  fontFamily: "sans-serif",
  position: "relative",
};

const colorBlock = (text: string, bg: string) => [
  "div",
  {
    style: {
      ...blockStyle,
      background: bg || undefined,
    },
  },
  text ? text : bg.toUpperCase(),
];

// RGB based complement ( rather than RYB )
// const complement = (out: Color, rgba: Color) => {
//   const hsva = rgbaHsva(out, rgba);
//   hsva[0] = hsva[0] + (0.5 % 1);
//   return hsvaRgba([], hsva);
// };

// https://www.accessibility-developer-guide.com/knowledge/colours-and-contrast/how-to-calculate/
// const contrastRatio = (col1: Color, col2: Color, colorMode: ColorMode) => {
//   const lum1 = luminance(col1, colorMode);
//   const lum2 = luminance(col2, colorMode);
//   return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
// };

// const LUM_RATIOS = [0.2126, 0.7152, 0.0722];
// // Using different luminance coefficients
// // Except seems to adjust for gamma correction
// // As : https://contrast-ratio.com
// const contrastRatio2 = (col1: Color, col2: Color, colorMode: ColorMode) => {
//   const lum1 = luminanceRGB(col1, LUM_RATIOS);
//   const lum2 = luminanceRGB(col2, LUM_RATIOS);
//   return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
// };

// hsvaRgba([], transform([], hueRotate(Math.PI), hsva))

const colorCombo = (color1: string, color2: string) => [
  "div",
  { style: { ...blockStyle } },
  [
    "div",
    {
      style: {
        position: "absolute",
        backgroundColor: color1,
        width: "100%",
        height: "100%",
      },
    },
  ],
  [
    "div",
    {
      style: {
        position: "absolute",
        backgroundColor: color2,
        width: "60%",
        height: "60%",
        left: "20%",
        top: "20%",
      },
    },
  ],
];

const colors = Object.keys(CSS_NAMES)
  .map((name) => ({ name, rgba: parseCss(name) }))
  .map(({ rgba, ...rest }) => ({
    ...rest,
    rgba,
    hsva: rgbHsv([], rgba as any),
  }))
  .map(({ hsva, rgba, ...rest }) => ({
    ...rest,
    rgba,
    hsva,
    closestHue: namedHueRgb(null, closestHue(hsva[0] as any)),
    closestPrimaryHue: namedHueRgb(null, closestPrimaryHue(hsva[0] as any)),
    luminance: luminance(rgba),
    complementary: complement(rgba.deref()),
  }))
  .map(({ rgba, complementary, ...rest }) => ({
    ...rest,
    complementary,
    rgba,
    complementaryRatio: contrastRatio2(rgba.deref(), complementary),
  }));

const colorStream = reactive(colors);
const colorList = $list(colorStream, "div", {}, (color) => [
  "div",
  {
    style: { display: "flex", marginBottom: "2px" },
  },
  colorBlock(color.name, color.name),
  colorBlock(null, rgbCss(color.closestHue)),
  colorBlock(null, rgbCss(color.closestPrimaryHue)),
  colorBlock(color.luminance.toString(), "white"),
  colorCombo(color.name, rgbCss(color.complementary)),
  colorBlock(color.complementaryRatio.toString(), "white"),
]);

const onFormChange = (ev: any) => {
  console.log(ev);
  const form: HTMLFormElement = ev.currentTarget;
  const data = new FormData(form);
  let result = colors.slice(0);

  switch (data.get("sort")) {
    case "luminance":
      result.sort((a, b) => b.luminance - a.luminance);
      break;
    case "contrast":
      result.sort((a, b) => b.complementaryRatio - a.complementaryRatio);
      break;
    case "name":
      result.sort();
      break;
  }

  const lumFilter = {
    min: parseFloat(data.get("luminance_min").toString()),
    max: parseFloat(data.get("luminance_max").toString()),
  };
  const conFilter = {
    min: parseFloat(data.get("contrast_min").toString()),
    max: parseFloat(data.get("contrast_max").toString()),
  };
  result = result
    .filter((x) => x.luminance >= lumFilter.min && x.luminance <= lumFilter.max)
    .filter(
      (x) =>
        x.complementaryRatio >= conFilter.min &&
        x.complementaryRatio <= conFilter.max
    );
  colorStream.next(result);
  // console.log(data.entries());
  // console.log(ev.currentTarget);
};

const minMaxRangeSlider = (
  title: string,
  name: string,
  min: number,
  max: number,
  step: number = 0.01
) => {
  // const value = reactive(0);

  return [
    ["span", {}, title],
    [
      "input",
      {
        type: "number",
        name: `${name}_min`,
        min,
        max,
        value: min,
        step,
      },
      "",
    ],
    [
      "input",
      {
        type: "number",
        name: `${name}_max`,
        min,
        max,
        value: max,
        step,
      },
      "",
    ],
  ];
};
$compile([
  "div",
  {},
  ["h1", {}, "Luminance & Contrast Ratio Exploration"],

  [
    "p",
    { style: { width: "300px" } },
    "A look at luminance values of colors, generating their complements and comparing and filtering their contrast ratios.",
  ],
  [
    "form",
    { onchange: onFormChange },
    ["h3", {}, "Sort"],

    ["input", { type: "radio", name: "sort", value: "luminance" }],
    ["span", {}, "Sort By Luminance"],
    ["input", { type: "radio", name: "sort", value: "contrast" }],
    ["span", {}, "Sort by Contrast Ratio"],
    ["input", { type: "radio", name: "sort", value: "name", checked: true }],
    ["span", {}, "Sort by Name"],
    ["h3", {}, "Filter"],
    ...minMaxRangeSlider("Filter Min/Max Luminance", "luminance", 0, 2),
    ...minMaxRangeSlider("Filter Min/Max Ratio", "contrast", 0, 10),
    ["h3", {}, "Total"],
    [
      "p",
      {},
      colorStream.transform(map((c) => `${c.length}/${colors.length}`)),
    ],
    ["hr", { style: { margin: "4rem 0rem" } }],
  ],
  colorList,
]).mount(document.body);

// colors.map(({ name, complementary }) => console.log(name, complementary));
