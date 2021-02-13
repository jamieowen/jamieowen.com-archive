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
    // Light
    text: "#555555",
    background: "#efefef",
    ...namedGradient("background", "#efefef", 0.05),
    ...namedGradient("text", "#555555", -0.3),
    primary: "blue",
    // ...namedComplement("primary", "blue"),

    modes: {
      // Dark
      dark: {
        text: "#eeeeee",
        background: "#323232",
        ...namedGradient("background", "#323232", 0.15),
        ...namedGradient("text", "#eeeeee", 0.25),
        primary: "pink",
        // ...namedComplement("primary", "#453333"),
      },
      yellow: {
        text: "#454545",
        background: "#ffff00",
        ...namedGradient("background", "#ffff00", 0.05),
        ...namedGradient("text", "#454545", -0.03),
        ...namedComplement("primary", "#ffff00"),
      },
      blue: {
        text: "#efefef",
        background: "#112526",
        ...namedGradient("background", "#112526", 0.05),
        ...namedGradient("text", "#454545", -0.03),
        ...namedComplement("primary", "#112526"),
      },
    },
  },
};

/**
    // text: "black",
    // background: "white",
    // primary: "#efefef",
    // secondary: "crimson",
    // accent: "hotpink",
    // highlight: "orange",
    // muted

    /** Custom */
// navigation_text: "#454545",
// navigation_bg: "transparent",

/**
 * Swatch Combinations
 */
// primary_text: "#454545",
// primary_bg: "whitesmoke",

// secondary_text: "whitesmoke",
// secondary_bg: "#212121",

// tertiary_text: "#333333",
// tertiary_bg: "whitesmoke",

/** Additional modes for dark mode, light mode, etc. **/
