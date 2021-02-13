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
      overflowY: "scroll",
      overflowX: "hidden",
      fontFamily: "body",
      fontSize: "body",
      margin: "0rem",

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
      "em, strong": {
        fontWeight: 600,
      },
      ".maxw-small": {
        maxWidth: "50rem",
      },
      ".maxw-medium": {
        // maxWidth: "50rem", // 1rem - 16
        maxWidth: "60rem",
      },
      ".maxw-full": {
        maxWidth: "100%",
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
  },
};
