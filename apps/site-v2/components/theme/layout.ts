import { Theme } from "theme-ui";

export const layout: Pick<Theme, "layout"> = {
  /** Layout Variants */
  layout: {
    container: {
      // margin: 0,
      // marginLeft: 0,
      // marginRight: 0,
    },
    side_panel: {
      position: "fixed",
      right: "0px",
      top: "0px",
      zIndex: 101,
      width: "64px",
      // height: "100%",
      // pointerEvents: "none",
    },
    full_header: {
      width: "100%",
      height: "100%",
      position: "fixed",
      zIndex: -1,
      backgroundColor: "background2",
    },
    section: {
      margin: "0px",
      padding: "0px",
    },
    rollover: {
      display: "absolute",
      width: "100%",
      height: "100%",
    },
  },
};
