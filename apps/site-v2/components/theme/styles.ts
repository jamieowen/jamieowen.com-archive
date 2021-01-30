import { Theme } from "theme-ui";

export const styles: Pick<Theme, "styles"> = {
  /** Styles **/
  /** Styles object is a kind of global css styles. Used for MDX rendering. */
  /** Can be used with Styled.h1 />
  /** see docs.. todo.. */
  styles: {
    /** Body Styles. */
    root: {
      overflowY: "scroll",
      overflowX: "hidden",
      fontFamily: "body",
      fontSize: "body",
      margin: "0rem",
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
      // "*": {
      //   transition: "background-color 1s ease-out, color 1.3s ease-in",
      // },
      a: {
        color: "inherit",
        textDecoration: "underline",
      },
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
