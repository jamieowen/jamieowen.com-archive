import { Theme, ColorMode, ColorModesScale } from "theme-ui";

export const colors: Pick<
  Theme,
  "colors" | "colorStyles" | "initialColorModeName"
> = {
  initialColorModeName: "light",
  colors: {
    // Light
    text: "#555555",
    background: "#efefef",

    modes: {
      // Dark
      dark: {
        text: "white",
        background: "black",
      },
      yellow: {
        text: "#454545",
        background: "#ffff00",
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
