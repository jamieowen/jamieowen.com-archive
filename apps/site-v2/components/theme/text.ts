import { Theme } from "theme-ui";

export const text: Pick<Theme, "text"> = {
  text: {
    body: {
      fontFamily: "roboto",
      fontSize: "24px",
      lineHeight: "48px",
      fontWeight: "400",
    },
    body_small: {
      fontFamily: "roboto",
      fontSize: "16px",
      lineHeight: "32px",
      fontWeight: "400",
    },
    subtitle_header: {
      fontFamily: "roboto",
      fontSize: "8px",
      fontWeight: 400,
      lineHeight: "48px",
      opacity: 0.5,
      textTransform: "uppercase",
    },
    // big project links..
    project_text: {
      fontFamily: "roboto",
      fontSize: "48px",
      lineHeight: "96px",
    },
    // client / agency links
    project_info: {
      fontFamily: "roboto",
      fontSize: "8px",
      lineHeight: "24px",
      margin: "0px",
      padding: "0px",
      textTransform: "uppercase",

      h3: {
        display: "inline-block",
        fontWeight: 400,
        fontSize: "8px",
        marginRight: "8px",
        margin: "0px",
        opacity: 0.5,
      },
      span: {
        // opacity
      },
    },

    /** Top Navigation Text */
    // navigation: {
    //   fontSize: 0,
    //   letterSpacing: "0.12em",
    //   opacity: 1,
    //   fontFamily: "roboto",
    //   fontWeight: "semibold",
    //   textTransform: "uppercase",
    //   // color: "navigation_text",
    //   color: "#232323",
    //   "> * + *": {
    //     marginLeft: "1rem !important",
    //   },
    // },
    // navigation_link: {
    //   fontWeight: "bold",
    //   fontFamily: "worksans",
    //   color: "inherit",
    //   display: "inline-block",
    //   "a:hover, a:link, a:visited": {
    //     color: "inherit",
    //     textDecoration: "none",
    //     opacity: 1,
    //   },
    //   ":hover": {
    //     opacity: 0.4,
    //     cursor: "pointer",
    //   },
    // },
    // /** Typical Heading */
    // heading: {
    //   color: "yellow",
    //   lineHeight: "2rem",
    // },
    // /**  Small Sub Heading */
    // subtitle_heading: {
    //   fontFamily: "roboto",
    //   fontSize: 0,
    //   letterSpacing: "0.2em",
    //   opacity: 0.45,
    //   textTransform: "uppercase",
    //   marginBottom: "3rem",
    // },

    // mediagrid_title: {
    //   position: "relative",
    //   // fontFamily: "roboto",
    //   fontFamily: "worksans",
    //   textTransform: "uppercase",
    //   fontSize: 1,
    //   lineHeight: "4rem",
    // },

    // /** Extra large intro paragraph */
    // body_title: {
    //   fontFamily: "worksans",
    //   fontWeight: "regular",
    //   lineHeight: "3.5rem",
    //   letterSpacing: 0.82,
    //   fontSize: 5,
    // },
    // /** Extra large intro paragraph */
    // body_normal: {
    //   fontFamily: "worksans",
    //   textTransform: "initial",
    //   fontWeight: "regular",
    //   fontSize: 2,
    //   lineHeight: "2rem",
    //   letterSpacing: 0.82,
    // },
  },
};
