import { Theme } from "theme-ui";
import { colors } from "./colors";
import { fonts } from "./fonts";
import { layout } from "./layout";
import { grids } from "./grids";
import { text } from "./text";
import { styles } from "./styles";

export default <Theme>{
  breakpoints: ["768px", "1024px"],
  ...colors,
  ...fonts,
  ...text,
  ...grids,
  ...layout,
  ...styles,
};
