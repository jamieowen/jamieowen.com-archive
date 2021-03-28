import { Theme, ColorMode, ColorModesScale } from "theme-ui";
import {
  paletteGradientHSL,
  paletteColorRangeHSL,
  complement,
} from "@jamieowen/color";
import { parseCss, rgbaCss } from "@thi.ng/color";

export const colors: Pick<
  Theme,
  "colors" | "colorStyles" | "initialColorModeName"
> = {
  initialColorModeName: "light",
  colors: {
    text: "#aaaaaa",
    background: "#C0BECC",
    content_text: "#5F5F5F",
    content_background: "#efefef",
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
