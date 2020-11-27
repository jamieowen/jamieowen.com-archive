import { Theme } from "theme-ui";

const theme: Theme = {
  /** Theme UI Config */
  /** Theme Spec : https://theme-ui.com/theme-spec/  */

  /** Breakpoints */
  /** Breakpoints for min-width queries */
  /** Responsive styles : https://theme-ui.com/getting-started/#responsive-styles */
  breakpoints: ["40em", "56em", "64em"],

  /** Font Settings */
  fonts: {
    body: "Oscine Trial, sans-serif",
    heading: '"Oscine Trial", sans-serif',
    monospace: "Menlo, monospace",
  },
  fontSizes: [
    /** These are not tied to html elements ( see theme spec doc ) */
    12, // h5
    14, // h4
    16, // h3
    20, // h2
    58, // h1
  ],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: "6rem",
  },
  letterSpacings: {
    body: "normal",
    caps: "0.2em",
  },

  /** Color Settings */
  colors: {
    /** key colour names within theme ui config. **/
    text: "#efefef",
    background: "white",
    primary: "#33e",
    secondary: "crimson",
    accent: "hotpink",
    highlight: "orange",

    /** Additional modes for dark mode, light mode, etc. **/
    modes: {},
  },

  /** Variants **/
  /** Variants are custom style objects within a nested object key  **/
  /** They can then be used in sx={{variant:'buttons.primary'}} declarations */
  /** And are also tied to the default theme ui components */
  /** See spec. */

  text: {
    headline: {
      // etc
    },
    heading: {
      // fontSize: 4,
      lineHeight: "heading",
    },
  },
  buttons: {
    primary: {
      // etc
    },
  },
  /** Styles **/
  /** Styles object is a kind of global css styles. Used for MDX rendering. */
  /** And may be default tags?? */
  /** see docs.. todo.. */
  styles: {
    /** Body Styles. */
    root: {
      fontFamily: "body",
      fontSize: "16px",
      margin: "0rem",
    },

    h1: {
      color: "secondary",
      fontFamily: "heading",
      fontSize: 4,
    },
  },
};

export default theme;
