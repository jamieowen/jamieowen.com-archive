import { Theme } from "theme-ui";

export const styles: Pick<Theme, "styles"> = {
  /** Styles **/
  /** Styles object is a kind of global css styles. Used for MDX rendering. */
  /** Can be used with Styled.h1 />
  /** see docs.. todo.. */
  styles: {
    /** Body Styles. */
    root: {
      fontFamily: "body",
      fontSize: 0,
      margin: "0rem",
    },
    "*": {
      backgroundColor: "black",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
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
