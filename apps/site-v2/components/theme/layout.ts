import { Theme } from "theme-ui";

export const layout: Pick<Theme, "layout"> = {
  /** Layout Variants */
  layout: {
    /** Debug element */
    debug: {
      position: "relative",
      backgroundColor: "whitesmoke",
      // background:
      //   "linear-gradient(169deg, rgba(10,188,204,1) 0%, rgba(255,247,222,1) 100%);",
      width: "100%",
      height: "100%",
    },
    container_of: {
      // width: '100%',
      // height:
    },
    /** Headers */

    /** Anything that sits at the top of a regular page. **/
    header_normal: {
      backgroundColor: "whitesmoke",
      minHeight: "33vh",
      padding: "10rem 0rem 0rem 0rem",
      color: "crimson",
      display: "flex",
      alignItems: "flex-end",
    },

    /** Larger hero elements */
    header_hero: {
      height: "66vh",
      display: "flex",
      alignItems: "flex-end",
    },

    footer_normal: {
      backgroundColor: "aqua",
      height: "33vh",
      color: "crimson",
    },

    /**
     * All content blocks ( an area  of content stretching edge to edge of the browser )
     * are wrapped in one of content_stretch or content_stretch_header.
     *
     * They are used by the ContentContainer component which applies bg and text colors.
     **/
    content_stretch: {
      width: "100%",
      // height: "calc(33vh - 2rem)",
      minHeight: "512px",
    },

    content_stretch_header: {
      width: "100%",
      paddingTop: "10rem",
      // height: "calc(33vh - 2rem)",
      minHeight: "512px",
    },

    content_center: {
      width: "80%", // main column content
      minWidth: "640px",
      maxWidth: "1024px",
      padding: "4rem 0rem",
    },

    /** full stretched content */
    content_hero: {
      width: "100%",
      backgroundColor: "whitesmoke",
      height: "calc(66vh - 2rem)",
      minHeight: "512px",
    },

    /** Top Navigation Bar */
    navigation: {
      height: "8rem",
      backgroundColor: "navigation_bg",
      position: "fixed",
      top: "0px",
      left: "0px",
      display: "flex",
      alignItems: "center",
    },
    /** Home slide / section area. an alternative content inner. */
    home_slide: {
      width: "100%",
      boxSizing: "border-box",
      height: "calc(66vh - 2rem)",
      minHeight: "512px",
      // padding: "0rem",
      padding: "4rem 0rem",
      display: "flex",
      alignItems: "flex-end",
    },
  },
};