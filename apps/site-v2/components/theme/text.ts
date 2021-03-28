import { Theme } from "theme-ui";

export const text: Pick<Theme, "text"> = {
  text: {
    body_text: {
      fontFamily: "body",
      fontSize: ["24px", "42px"],
      lineHeight: ["42px", "64px"],
      fontWeight: 600,
      letterSpacing: [-1.8, -2.8],
      // color: "#aaa",
      // marginBottom: "32px",
    },

    body_small: {
      fontFamily: "body",
      fontSize: ["16px", "24px"],
      lineHeight: ["32px", "42px"],
      fontWeight: 500,
      letterSpacing: -1,
      // color: "#aaa",
      // marginBottom: "32px",
    },

    body_large: {
      fontFamily: "body",
      fontSize: "16px",
      lineHeight: "56px",
      fontWeight: 600,
      // color: "primary",
      // marginBottom: "32px",
    },

    body_header: {
      fontFamily: "heading",
      fontSize: "8px",
      fontWeight: 500,
      lineHeight: "48px",
      opacity: 0.75,
      textTransform: "uppercase",
    },

    body_link: {
      color: "hotpink",
      fontSize: "42px",
    },
    /**
     * Navigation Menu
     *
     * For navigation menu in the top left.
     **/
    navigation_menu: {
      fontFamily: "navigation",
      fontSize: ["12px", "16px"],
      fontWeight: 400,
      lineHeight: "32px",
      textDecoration: "underline",
      cursor: "pointer",
      // marginRight: "16px",
      ":hover": {
        opacity: 0.4,
        textDecoration: "line-through",
      },
    },

    /**
     * Navigation Body
     *
     * For previous & next when navigating
     * from content page.
     **/
    navigation_body: {
      fontFamily: "navigation",
      fontSize: "20px",
      fontWeight: 500,
      lineHeight: "32px",
      textDecoration: "underline",
      cursor: "pointer",
      marginRight: "16px",
      ":hover": {
        opacity: 0.8,
        textDecoration: "line-through",
      },
    },

    navigation_list: {
      fontFamily: "navigation",
      fontSize: ["16px", "24px"],
      fontWeight: 500,
      // lineHeight: "32px",
      lineHeight: ["32px", "42px"],
      textDecoration: "underline",
      cursor: "pointer",
      // marginRight: (v)=>'10px',
      ":hover": {
        opacity: 0.8,
        textDecoration: "line-through",
        backgroundColor: "content_text",
        color: "content_background",
      },
    },
  },
};
