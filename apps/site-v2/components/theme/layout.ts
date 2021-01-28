import { Theme } from "theme-ui";

export const layout: Pick<Theme, "layout"> = {
  /** Layout Variants */
  layout: {
    slide_container: {
      width: "100%",
      height: "100%",
      padding: "0% 0% 50% 50%",
      position: "absolute",
      backgroundColor: "background",
      color: "text",
      transition: "background-color 1s ease-out, color 1.3s ease-in",
      "> .margin": {
        marginBottom: "256px !important",
      },
      ".sml": {
        maxWidth: ["90%", "65%"],
      },
      ".mid": {
        maxWidth: ["90%", "75%"],
      },
      ".full": {
        maxWidth: ["100%", "100%"],
      },
    },
    slide_shadow: {
      width: "100%",
      height: "8px",
      position: "fixed",
      opacity: "0.1",
      backgroundColor: "red",
      zIndex: 100,
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
    /** Debug element */
    // debug: {
    //   position: "relative",
    //   backgroundColor: "whitesmoke",
    //   // background:
    //   //   "linear-gradient(169deg, rgba(10,188,204,1) 0%, rgba(255,247,222,1) 100%);",
    //   width: "100%",
    //   height: "100%",
    // },
    // container_of: {
    //   // width: '100%',
    //   // height:
    // },
    // /** Headers */
    // /** Anything that sits at the top of a regular page. **/
    // header_normal: {
    //   backgroundColor: "whitesmoke",
    //   minHeight: "33vh",
    //   padding: "10rem 0rem 0rem 0rem",
    //   color: "crimson",
    //   display: "flex",
    //   alignItems: "flex-end",
    // },
    // /** Larger hero elements */
    // header_hero: {
    //   height: "66vh",
    //   display: "flex",
    //   alignItems: "flex-end",
    // },
    // footer_normal: {
    //   backgroundColor: "aqua",
    //   height: "33vh",
    //   color: "crimson",
    // },
    // /**
    //  * All content blocks ( an area  of content stretching edge to edge of the browser )
    //  * are wrapped in one of content_stretch or content_stretch_header.
    //  *
    //  * They are used by the ContentContainer component which applies bg and text colors.
    //  **/
    // content_stretch: {
    //   width: "100%",
    //   // height: "calc(33vh - 2rem)",
    //   minHeight: "512px",
    // },
    // content_stretch_header: {
    //   width: "100%",
    //   paddingTop: "10rem",
    //   // height: "calc(33vh - 2rem)",
    //   minHeight: "512px",
    // },
    // // centers the column
    // content_center: {
    //   width: ["100%", "90%", "80%"],
    //   // minWidth: "640px",
    //   maxWidth: "1024px",
    //   padding: ["12rem 2rem", "12rem 0rem", "12rem 0rem"],
    //   "> * + *": {
    //     marginTop: "4rem !important",
    //   },
    // },
    // /** full stretched content */
    // content_hero: {
    //   width: "100%",
    //   backgroundColor: "whitesmoke",
    //   height: "calc(66vh - 2rem)",
    //   minHeight: "512px",
    // },
    // /** Top Navigation Bar */
    // navigation: {
    //   height: "4rem",
    //   // backgroundColor: "#212121",
    //   position: "fixed",
    //   top: "0px",
    //   left: "0px",
    //   display: "flex",
    //   alignItems: "center",
    // },
    // /** Home slide / section area. an alternative content inner. */
    // home_slide: {
    //   width: "100%",
    //   boxSizing: "border-box",
    //   height: "calc(66vh - 2rem)",
    //   minHeight: "512px",
    //   // padding: "0rem",
    //   padding: "4rem 0rem",
    //   display: "flex",
    //   alignItems: "flex-end",
    // },
  },
};
