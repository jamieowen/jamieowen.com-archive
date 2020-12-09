import { Theme } from "theme-ui";

export const text: Pick<Theme, "text"> = {
  text: {
    /** Top Navigation Text */
    navigation: {
      fontSize: 2,
      fontFamily: "worksans",
      fontWeight: "regular",
      color: "navigation_text",
      "> * + *": {
        marginLeft: "1rem !important",
      },
    },
    navigation_link: {
      fontWeight: "bold",
      fontFamily: "worksans",
      color: "inherit",
      display: "inline-block",
      "a:hover, a:link, a:visited": {
        color: "inherit",
        textDecoration: "none",
      },
      ":hover": {
        opacity: 0.4,
        cursor: "pointer",
      },
    },
    /** Typical Heading */
    heading: {
      color: "yellow",
      lineHeight: "heading",
    },
    /**  Small Sub Heading */
    subtitle_heading: {
      fontFamily: "roboto",
      fontSize: 0,
      letterSpacing: "0.2em",
      opacity: 0.45,
      textTransform: "uppercase",
      marginBottom: "3rem",
    },

    mediagrid_title: {
      position: "relative",
      // fontFamily: "roboto",
      fontFamily: "worksans",
      textTransform: "uppercase",
      fontSize: 1,
      lineHeight: "4rem",
    },

    /** Extra large intro paragraph */
    body_title: {
      fontFamily: "worksans",
      fontWeight: "semibold",
      lineHeight: "2.5rem",
      fontSize: 4,
    },
    body_normal: {
      fontFamily: "roboto",
      textTransform: "uppercase",
      fontSize: 1,
      lineHeight: "1.5rem",
      letterSpacing: 0.12,
    },
  },
};
