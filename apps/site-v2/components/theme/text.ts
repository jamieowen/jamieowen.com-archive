import { Theme } from "theme-ui";

export const text: Pick<Theme, "text"> = {
  text: {
    /** Top Navigation Text */
    navigation: {
      fontSize: 2,
      fontFamily: "worksans",
      fontWeight: "bold",
      color: "navigation_text",
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
      letterSpacing: "0.1em",
      opacity: 0.45,
      textTransform: "uppercase",
      marginBottom: "3rem",
    },

    mediagrid_title: {
      position: "relative",
      fontFamily: "roboto",
      textTransform: "uppercase",
      fontSize: 1,
      lineHeight: "4rem",
    },

    /** Extra large intro paragraph */
    body_title: {
      fontFamily: "worksans",
      fontWeight: "semibold",
      lineHeight: "2rem",
      fontSize: 3,
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
