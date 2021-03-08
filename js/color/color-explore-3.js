import * as ReactDOM from "../../_snowpack/pkg/react-dom.js";
import React, {useState, useMemo} from "../../_snowpack/pkg/react.js";
import {
  paletteColorRangeHSL,
  paletteForegroundBackground
} from "../../_snowpack/pkg/@jamieowen/color.js";
import {CSS_NAMES, parseCss, rgbCss} from "../../_snowpack/pkg/@thi.ng/color.js";
const styleFlex = () => ({
  display: "flex",
  flexWrap: "wrap"
});
const styleDims = (w, h) => ({
  width: w,
  height: h
});
const styleFont = (size, spacing, lineHeight) => ({
  fontSize: size,
  letterSpacing: spacing,
  lineHeight
});
const styleColor = (color) => ({
  color: rgbCss(color)
});
const styleBgColor = (color) => ({
  backgroundColor: rgbCss(color)
});
const stylePadding = (pad) => ({
  padding: pad + "px"
});
const Swatch = ({color}) => {
  return /* @__PURE__ */ React.createElement("div", {
    style: {...styleDims(100, 100), ...styleBgColor(color)}
  });
};
const Swatches = ({colors}) => {
  return /* @__PURE__ */ React.createElement("div", {
    style: {...styleFlex()}
  }, colors.map((c, i) => /* @__PURE__ */ React.createElement(Swatch, {
    key: i,
    color: c
  })));
};
const Flex = ({children}) => {
  return /* @__PURE__ */ React.createElement("div", {
    style: {...styleFlex()}
  }, children);
};
const CssColorSelect = ({
  onChange = () => {
  }
}) => {
  const [selected, setSelected] = useState("darkblue");
  const options = useMemo(() => Object.keys(CSS_NAMES).map((val, i) => /* @__PURE__ */ React.createElement("option", {
    key: i
  }, val)), []);
  return /* @__PURE__ */ React.createElement("select", {
    value: selected,
    onChange: (ev) => {
      const name = ev.target.options[ev.target.selectedIndex].value;
      setSelected(name);
      const color = parseCss(name);
      onChange(color.deref());
    }
  }, options);
};
const InputRange = ({
  min = 0,
  max = 1,
  step = 0.1,
  val = 0.5,
  label = "Label",
  onChange = () => {
  }
}) => {
  const [value, setValue] = useState(val);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", null, label), /* @__PURE__ */ React.createElement("input", {
    value,
    type: "range",
    min,
    max,
    step,
    onChange: (ev) => {
      const val2 = parseFloat(ev.target.value);
      setValue(val2);
      onChange(val2);
    }
  }), /* @__PURE__ */ React.createElement("span", {
    style: {display: "inline-block", width: "30px"}
  }, value));
};
const RangePalette = ({steps = 13}) => {
  const [color, setColor] = useState([1, 0, 1]);
  const [args, setArgs] = useState({
    steps: 13,
    range: 0.3,
    scale: 1,
    clamp: [0, 1]
  });
  const palette = useMemo(() => paletteColorRangeHSL(color, {...args}), [
    color,
    steps,
    args.scale,
    args.range,
    args.clamp
  ]);
  const baseColorSwatches = useMemo(() => {
    return new Array(steps).fill([1, 1, 1]).map((v, i) => {
      return i === Math.floor(steps / 2) ? color : v;
    });
  }, [steps, color]);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", null, "Range"), /* @__PURE__ */ React.createElement("p", null, "Range Palette Util Generating a Palette around a given color. ", /* @__PURE__ */ React.createElement("br", null), "Clamping at 0 and 1 does change the central color of the palette away from the base color depending its lightness."), /* @__PURE__ */ React.createElement(CssColorSelect, {
    onChange: (color2) => setColor(color2)
  }), /* @__PURE__ */ React.createElement(Flex, null, /* @__PURE__ */ React.createElement(InputRange, {
    label: "Scale",
    val: 1,
    min: 0,
    max: 2,
    step: 0.01,
    onChange: (scale) => setArgs({...args, scale})
  }), /* @__PURE__ */ React.createElement(InputRange, {
    label: "Range",
    min: 0,
    max: 1,
    step: 0.01,
    onChange: (range) => setArgs({...args, range})
  }), /* @__PURE__ */ React.createElement(InputRange, {
    label: "Clamp Min",
    val: 0,
    min: -2,
    max: 1,
    step: 0.01,
    onChange: (min) => setArgs({...args, clamp: [min, args.clamp[1]]})
  }), /* @__PURE__ */ React.createElement(InputRange, {
    label: "Clamp Max",
    val: 1,
    min: 0,
    max: 2,
    step: 0.01,
    onChange: (max) => setArgs({...args, clamp: [args.clamp[0], max]})
  })), /* @__PURE__ */ React.createElement(Swatches, {
    colors: baseColorSwatches
  }), /* @__PURE__ */ React.createElement(Swatches, {
    colors: palette
  }));
};
const ForegroundBackgroundPalette = () => {
  const [color, setColor] = useState([1, 0, 1]);
  const [args, setArgs] = useState({
    clamp: [0.1, 0.9],
    saturation: [1, 1],
    invert: false
  });
  const fgBg = useMemo(() => paletteForegroundBackground(color, {...args}), [
    args.clamp,
    args.invert,
    args.saturation,
    color
  ]);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", null, "Foreground / Background"), /* @__PURE__ */ React.createElement("p", null, "Utility to generate an approriate background and Foreground color based on a given color."), /* @__PURE__ */ React.createElement(CssColorSelect, {
    onChange: (color2) => setColor(color2)
  }), /* @__PURE__ */ React.createElement(Flex, null, /* @__PURE__ */ React.createElement("input", {
    type: "checkbox",
    checked: args.invert,
    onChange: () => setArgs({...args, invert: !args.invert})
  }), /* @__PURE__ */ React.createElement(InputRange, {
    label: "Saturation BG",
    val: 1,
    min: 0,
    max: 1,
    step: 0.01,
    onChange: (bg) => setArgs({...args, saturation: [bg, args.saturation[1]]})
  }), /* @__PURE__ */ React.createElement(InputRange, {
    label: "Saturation FG",
    val: 1,
    min: 0,
    max: 1,
    step: 0.01,
    onChange: (fg) => setArgs({...args, saturation: [args.saturation[0], fg]})
  }), /* @__PURE__ */ React.createElement(InputRange, {
    label: "Clamp BG",
    val: 0,
    min: 0,
    max: 1,
    step: 0.01,
    onChange: (min) => setArgs({...args, clamp: [min, args.clamp[1]]})
  }), /* @__PURE__ */ React.createElement(InputRange, {
    label: "Clamp FG",
    val: 1,
    min: 0,
    max: 1,
    step: 0.01,
    onChange: (max) => setArgs({...args, clamp: [args.clamp[0], max]})
  })), /* @__PURE__ */ React.createElement(Flex, null, /* @__PURE__ */ React.createElement(Swatches, {
    colors: [fgBg[0], color, fgBg[1]]
  }), /* @__PURE__ */ React.createElement("div", {
    style: {
      ...styleFont("32px", 1.2, "48px"),
      ...styleDims(600, ""),
      ...styleBgColor(fgBg[0]),
      ...stylePadding(40),
      ...styleColor(fgBg[1])
    }
  }, /* @__PURE__ */ React.createElement("b", null, "Maecenas at fermentum nisi."), " Quisque ac neque id ex vestibulum ornare. Aenean id dictum sapien. Aliquam feugiat quis nisl vitae sollicitudin. Curabitur blandit mauris massa, porttitor congue leo congue quis. Ut tempor nulla eu nisl gravida, placerat dictum metus consequat. Sed orci massa, pulvinar at purus sit amet, eleifend aliquet nisi.")));
};
const Test = () => {
  return /* @__PURE__ */ React.createElement("div", {
    style: {
      fontFamily: "Roboto",
      letterSpacing: "0.2px",
      lineHeight: "1.5em"
    }
  }, /* @__PURE__ */ React.createElement("p", null, "Hello"), /* @__PURE__ */ React.createElement(RangePalette, {
    steps: 13
  }), /* @__PURE__ */ React.createElement(ForegroundBackgroundPalette, null));
};
const ele = document.createElement("div");
document.body.appendChild(ele);
ReactDOM.render(/* @__PURE__ */ React.createElement(Test, null), ele);
