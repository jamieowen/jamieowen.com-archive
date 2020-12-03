import { Theme } from "theme-ui";

export const text: Pick<Theme, "styles"> = {
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

    h1: {
      variant: "heading",
      color: "secondary",
      fontFamily: "heading",
      fontWeight: "semibold",
      fontSize: 3,
      lineHeight: "2rem",
    },
    em: {
      fontWeight: "light",
      fontStyle: "normal",
    },
  },
};
