import { Theme } from "theme-ui";
import { colors } from "./colors";
import { fonts } from "./fonts";
import { layout } from "./layout";
import { grids } from "./grids";
import { text } from "./text";

export default <Theme>{
  breakpoints: ["40em", "56em", "64em"],
  ...colors,
  ...fonts,
  ...text,
  ...grids,
  ...layout,
};
