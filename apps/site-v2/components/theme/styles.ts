import { Theme } from "theme-ui";

export const styles: Pick<Theme, "styles"> = {
  /** Styles **/
  /** Styles object is a kind of global css styles. Used for MDX rendering. */
  /** Can be used with Styled.h1 />
  /** see docs.. todo.. */
  styles: {
    /** Body Styles. */
    root: {
      // background color *behind* header
      backgroundColor: "content_background",
      overflow: "hidden",
      fontFamily: "body",
      margin: "0rem",
      width: "100%",
      height: "100%",

      "#__next": {
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        overflowY: "scroll",
        position: "fixed",
      },

      /**
       *
       * Some global class helpers to use where needed.
       *
       */
      ".opq3": {
        opacity: 0.3,
      },
      ".opq5": {
        opacity: 0.5,
      },
      ".opq75": {
        opacity: 0.75,
      },
      "em, strong": {
        fontWeight: 600,
      },
      ".maxw-small": {
        maxWidth: "50rem",
      },
      ".maxw-medium": {
        maxWidth: "60rem",
      },
      ".maxw-full": {
        maxWidth: "100%",
      },

      ".align-left": {
        textAlign: "left",
      },

      ".align-right": {
        textAlign: "right",
      },

      // Used for selected router links
      ".selected": {
        color: "content_background",
        pointerEvents: "none",
        textDecoration: "line-through",
      },
      a: {
        color: "inherit",
        textDecoration: "none",
      },

      // "*": {
      //   transition: "background-color 1s ease-out, color 1.3s ease-in",
      // },
    },
    h1: {
      variant: "heading",
      color: "secondary",
      fontFamily: "heading",
      fontWeight: "semibold",
      fontSize: 3,
      lineHeight: "2rem",
    },
    em: {
      fontWeight: "bold",
      fontStyle: "normal",
    },
    a: {
      textDecoration: "underline",
      ":hover": {
        backgroundColor: "content_text",
        color: "content_background",
      },
    },
  },
};
