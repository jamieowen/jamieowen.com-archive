import { Theme } from "theme-ui";

const createModes = () => {};

export const colors: Pick<
  Theme,
  "colors" | "colorStyles" | "initialColorModeName"
> = {
  colors: {
    /** theme ui default **/
    text: "#444444",
    background: "black",
    primary: "#efefef",
    secondary: "crimson",
    accent: "hotpink",
    highlight: "orange",
    // muted

    /** Custom */
    navigation_text: "#454545",
    navigation_bg: "transparent",

    /**
     * Swatch Combinations
     */
    primary_text: "#454545",
    primary_bg: "whitesmoke",

    secondary_text: "whitesmoke",
    secondary_bg: "#212121",

    tertiary_text: "#333333",
    tertiary_bg: "whitesmoke",

    /** Additional modes for dark mode, light mode, etc. **/
    modes: {
      light: {},
      dark: {},
    },
  },
};
