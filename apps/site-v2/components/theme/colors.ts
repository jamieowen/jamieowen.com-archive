import { Theme, ColorMode, ColorModesScale } from "theme-ui";
import {
  paletteGradientHSL,
  paletteColorRangeHSL,
  complement,
} from "@jamieowen/color";
import { parseCss, rgbaCss } from "@thi.ng/color";

/**
 * Generate backgrouund colors used as Slide background colors.
 * @param name
 * @param color
 */
const namedGradient = (name: string, color: string, range: number = 0.2) => {
  const col = parseCss(color);
  const colors = paletteColorRangeHSL(col, {
    steps: 5,
    scale: 1,
    range: range,
  });
  // only use the first 3. ( util creates a range on either side of the scale value )
  return colors
    .slice(0, 3)
    .reverse()
    .reduce((map, col, i) => {
      map[name + i] = rgbaCss(col);
      return map;
    }, {});
};

const namedComplement = (name: string, color: string) => {
  return {
    [name]: rgbaCss(complement(parseCss(color))),
  };
};

export const colors: Pick<
  Theme,
  "colors" | "colorStyles" | "initialColorModeName"
> = {
  initialColorModeName: "light",
  colors: {
    text: "#f6f6f6",
    background: "#C0BECC",
    content_text: "#dfdfdf",
    content_background: "#222222",
    footer_background: "#202020",
    primary: "hotpink",

    modes: {
      dark: {
        text: "#eeeeee",
        background: "#323232",
        primary: "pink",
      },
    },
  },
};
