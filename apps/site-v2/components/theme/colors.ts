import { Theme } from "theme-ui";

export const colors: Pick<
  Theme,
  "colors" | "colorStyles" | "initialColorModeName"
> = {
  colors: {
    /** theme ui default **/
    text: "#efefef",
    background: "white",
    primary: "#efefef",
    secondary: "crimson",
    accent: "hotpink",
    highlight: "orange",
    // muted

    /** Custom */
    navigation_text: "#454545",
    navigation_bg: "transparent",

    /** Home */
    slide_1_text: "hotpink",
    slide_1_bg: "white",
    slide_2_text: "#222222",
    slide_2_bg: "indianred",
    slide_3_text: "#f2f2f2",
    slide_3_bg: "#1c1c1c",
    slide_4_text: "#454545",
    slide_4_bg: "#FEFF00",

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
