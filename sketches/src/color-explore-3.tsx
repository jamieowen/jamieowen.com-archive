import * as ReactDOM from "react-dom";
import React, { FC, useState, useMemo, CSSProperties } from "react";
import {
  paletteColorRangeHSL,
  paletteForegroundBackground,
} from "@jamieowen/color";
import { Color, CSS_NAMES, parseCss, rgbaCss } from "@thi.ng/color";

const styleFlex = (): CSSProperties => ({
  display: "flex",
  flexWrap: "wrap",
});

const styleDims = (w: number | string, h: number | string) => ({
  width: w,
  height: h,
});

const styleFont = (
  size: number | string,
  spacing: number | string,
  lineHeight: number | string
): CSSProperties => ({
  fontSize: size,
  letterSpacing: spacing,
  lineHeight: lineHeight,
});

const styleColor = (color: Color) => ({
  color: rgbaCss(color),
});

const styleBgColor = (color: Color) => ({
  backgroundColor: rgbaCss(color),
});

const stylePadding = (pad: number) => ({
  padding: pad + "px",
});

const Swatch: FC<{ color: Color }> = ({ color }) => {
  return <div style={{ ...styleDims(100, 100), ...styleBgColor(color) }}></div>;
};

const Swatches: FC<{ colors: Color[] }> = ({ colors }) => {
  return (
    <div style={{ ...styleFlex() }}>
      {colors.map((c, i) => (
        <Swatch key={i} color={c} />
      ))}
    </div>
  );
};

const Flex: FC<any> = ({ children }) => {
  return <div style={{ ...styleFlex() }}>{children}</div>;
};

const CssColorSelect: FC<{ onChange: (color: Color) => void }> = ({
  onChange = () => {},
}) => {
  const [selected, setSelected] = useState("darkblue");
  const options = useMemo(
    () =>
      Object.keys(CSS_NAMES).map((val, i) => <option key={i}>{val}</option>),
    []
  );
  return (
    <select
      value={selected}
      onChange={(ev) => {
        const name = ev.target.options[ev.target.selectedIndex].value;
        setSelected(name);
        const color = parseCss(name);
        onChange(color);
      }}
    >
      {options}
    </select>
  );
};

const InputRange: FC<{
  val?: number;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (val: number) => void;
}> = ({
  min = 0,
  max = 1,
  step = 0.1,
  val = 0.5,
  label = "Label",
  onChange = () => {},
}) => {
  const [value, setValue] = useState(val);
  return (
    <div>
      <div>{label}</div>
      <input
        value={value}
        type="range"
        min={min}
        max={max}
        step={step}
        onChange={(ev) => {
          const val = parseFloat(ev.target.value);
          setValue(val);
          onChange(val);
        }}
      />
      <span style={{ display: "inline-block", width: "30px" }}>{value}</span>
    </div>
  );
};

const RangePalette: FC<{ steps: number }> = ({ steps = 13 }) => {
  const [color, setColor] = useState<Color>([1, 0, 1]);
  const [args, setArgs] = useState({
    steps: 13,
    range: 0.3,
    scale: 1,
    clamp: [0, 1] as [number, number],
  });
  const palette = useMemo(() => paletteColorRangeHSL(color, { ...args }), [
    color,
    steps,
    args.scale,
    args.range,
    args.clamp,
  ]);
  const baseColorSwatches = useMemo(() => {
    return new Array(steps).fill([1, 1, 1]).map((v, i) => {
      return i === Math.floor(steps / 2) ? color : v;
    });
  }, [steps, color]);

  return (
    <div>
      <h2>Range</h2>
      <p>
        Range Palette Util Generating a Palette around a given color. <br />
        Clamping at 0 and 1 does change the central color of the palette away
        from the base color depending its lightness.
      </p>
      <CssColorSelect onChange={(color) => setColor(color)} />
      <Flex>
        <InputRange
          label="Scale"
          val={1}
          min={0}
          max={2}
          step={0.01}
          onChange={(scale) => setArgs({ ...args, scale })}
        />
        <InputRange
          label="Range"
          min={0}
          max={1}
          step={0.01}
          onChange={(range) => setArgs({ ...args, range })}
        />
        <InputRange
          label="Clamp Min"
          val={0}
          min={-2}
          max={1}
          step={0.01}
          onChange={(min) => setArgs({ ...args, clamp: [min, args.clamp[1]] })}
        />
        <InputRange
          label="Clamp Max"
          val={1}
          min={0}
          max={2}
          step={0.01}
          onChange={(max) => setArgs({ ...args, clamp: [args.clamp[0], max] })}
        />
      </Flex>
      <Swatches colors={baseColorSwatches} />
      <Swatches colors={palette} />
    </div>
  );
};

const ForegroundBackgroundPalette: FC<any> = () => {
  const [color, setColor] = useState<Color>([1, 0, 1]);
  const [args, setArgs] = useState({
    clamp: [0.1, 0.9] as [number, number],
    saturation: [1, 1] as [number, number],
    invert: false,
  });
  const fgBg = useMemo(() => paletteForegroundBackground(color, { ...args }), [
    args.clamp,
    args.invert,
    args.saturation,
    color,
  ]);

  return (
    <div>
      <h2>Foreground / Background</h2>
      <p>
        Utility to generate an approriate background and Foreground color based
        on a given color.
      </p>
      <CssColorSelect onChange={(color) => setColor(color)} />
      <Flex>
        <input
          type="checkbox"
          checked={args.invert}
          onChange={() => setArgs({ ...args, invert: !args.invert })}
        />
        <InputRange
          label="Saturation BG"
          val={1}
          min={0}
          max={1}
          step={0.01}
          onChange={(bg) =>
            setArgs({ ...args, saturation: [bg, args.saturation[1]] })
          }
        />
        <InputRange
          label="Saturation FG"
          val={1}
          min={0}
          max={1}
          step={0.01}
          onChange={(fg) =>
            setArgs({ ...args, saturation: [args.saturation[0], fg] })
          }
        />
        <InputRange
          label="Clamp BG"
          val={0}
          min={0}
          max={1}
          step={0.01}
          onChange={(min) => setArgs({ ...args, clamp: [min, args.clamp[1]] })}
        />
        <InputRange
          label="Clamp FG"
          val={1}
          min={0}
          max={1}
          step={0.01}
          onChange={(max) => setArgs({ ...args, clamp: [args.clamp[0], max] })}
        />
      </Flex>
      <Flex>
        <Swatches colors={[fgBg[0], color, fgBg[1]]} />
        <div
          style={{
            ...styleFont("32px", 1.2, "48px"),
            ...styleDims(600, ""),
            ...styleBgColor(fgBg[0]),
            ...stylePadding(40),
            ...styleColor(fgBg[1]),
          }}
        >
          <b>Maecenas at fermentum nisi.</b> Quisque ac neque id ex vestibulum
          ornare. Aenean id dictum sapien. Aliquam feugiat quis nisl vitae
          sollicitudin. Curabitur blandit mauris massa, porttitor congue leo
          congue quis. Ut tempor nulla eu nisl gravida, placerat dictum metus
          consequat. Sed orci massa, pulvinar at purus sit amet, eleifend
          aliquet nisi.
        </div>
      </Flex>
    </div>
  );
};

const Test = () => {
  return (
    <div
      style={{
        fontFamily: "Roboto",
        letterSpacing: "0.2px",
        lineHeight: "1.5em",
      }}
    >
      <p>Hello</p>
      <RangePalette steps={13} />
      <ForegroundBackgroundPalette />
    </div>
  );
};

const ele = document.createElement("div");
document.body.appendChild(ele);
ReactDOM.render(<Test />, ele);
