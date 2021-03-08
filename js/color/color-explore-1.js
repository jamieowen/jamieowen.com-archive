import {$compile, $list} from "../../_snowpack/pkg/@thi.ng/rdom.js";
import {reactive} from "../../_snowpack/pkg/@thi.ng/rstream.js";
import {map} from "../../_snowpack/pkg/@thi.ng/transducers.js";
import {
  CSS_NAMES,
  closestHue,
  closestPrimaryHue,
  parseCss,
  rgbCss,
  rgbHsv,
  namedHueRgb,
  luminance
} from "../../_snowpack/pkg/@thi.ng/color.js";
import {complement, contrastRatio2} from "../../_snowpack/pkg/@jamieowen/color.js";
const blockStyle = {
  width: "200px",
  height: "40px",
  fontFamily: "sans-serif",
  position: "relative"
};
const colorBlock = (text, bg) => [
  "div",
  {
    style: {
      ...blockStyle,
      background: bg || void 0
    }
  },
  text ? text : bg.toUpperCase()
];
const colorCombo = (color1, color2) => [
  "div",
  {style: {...blockStyle}},
  [
    "div",
    {
      style: {
        position: "absolute",
        backgroundColor: color1,
        width: "100%",
        height: "100%"
      }
    }
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
        top: "20%"
      }
    }
  ]
];
const colors = Object.keys(CSS_NAMES).map((name) => ({name, rgba: parseCss(name)})).map(({rgba, ...rest}) => ({
  ...rest,
  rgba: rgba.deref(),
  hsva: rgbHsv([], rgba.deref())
})).map(({hsva, rgba, ...rest}) => ({
  ...rest,
  rgba,
  hsva,
  closestHue: namedHueRgb(null, closestHue(hsva[0])),
  closestPrimaryHue: namedHueRgb(null, closestPrimaryHue(hsva[0])),
  luminance: luminance(rgba),
  complementary: complement(rgba)
})).map(({rgba, complementary, ...rest}) => ({
  ...rest,
  complementary,
  rgba,
  complementaryRatio: contrastRatio2(rgba, complementary)
}));
const colorStream = reactive(colors);
const colorList = $list(colorStream, "div", {}, (color) => [
  "div",
  {
    style: {display: "flex", marginBottom: "2px"}
  },
  colorBlock(color.name, color.name),
  colorBlock(null, rgbCss(color.closestHue)),
  colorBlock(null, rgbCss(color.closestPrimaryHue)),
  colorBlock(color.luminance.toString(), "white"),
  colorCombo(color.name, rgbCss(color.complementary)),
  colorBlock(color.complementaryRatio.toString(), "white")
]);
const onFormChange = (ev) => {
  console.log(ev);
  const form = ev.currentTarget;
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
    max: parseFloat(data.get("luminance_max").toString())
  };
  const conFilter = {
    min: parseFloat(data.get("contrast_min").toString()),
    max: parseFloat(data.get("contrast_max").toString())
  };
  result = result.filter((x) => x.luminance >= lumFilter.min && x.luminance <= lumFilter.max).filter((x) => x.complementaryRatio >= conFilter.min && x.complementaryRatio <= conFilter.max);
  colorStream.next(result);
};
const minMaxRangeSlider = (title, name, min, max, step = 0.01) => {
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
        step
      },
      ""
    ],
    [
      "input",
      {
        type: "number",
        name: `${name}_max`,
        min,
        max,
        value: max,
        step
      },
      ""
    ]
  ];
};
$compile([
  "div",
  {},
  ["h1", {}, "Luminance & Contrast Ratio Exploration"],
  [
    "p",
    {style: {width: "300px"}},
    "A look at luminance values of colors, generating their complements and comparing and filtering their contrast ratios."
  ],
  [
    "form",
    {onchange: onFormChange},
    ["h3", {}, "Sort"],
    ["input", {type: "radio", name: "sort", value: "luminance"}],
    ["span", {}, "Sort By Luminance"],
    ["input", {type: "radio", name: "sort", value: "contrast"}],
    ["span", {}, "Sort by Contrast Ratio"],
    ["input", {type: "radio", name: "sort", value: "name", checked: true}],
    ["span", {}, "Sort by Name"],
    ["h3", {}, "Filter"],
    ...minMaxRangeSlider("Filter Min/Max Luminance", "luminance", 0, 2),
    ...minMaxRangeSlider("Filter Min/Max Ratio", "contrast", 0, 10),
    ["h3", {}, "Total"],
    [
      "p",
      {},
      colorStream.transform(map((c) => `${c.length}/${colors.length}`))
    ],
    ["hr", {style: {margin: "4rem 0rem"}}]
  ],
  colorList
]).mount(document.body);
