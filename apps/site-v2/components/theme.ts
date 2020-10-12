export default {
  /** Theme UI Config */
  /** Theme Spec : https://theme-ui.com/theme-spec/  */

  /** Breakpoints */
  /** Breakpoints for min-width queries */
  /** Responsive styles : https://theme-ui.com/getting-started/#responsive-styles */
  breakpoints: ["40em", "56em", "64em"],

  /** Font Settings */
  fonts: {
    body: "Arial, sans-serif",
    heading: '"Avenir Next", sans-serif',
    monospace: "Menlo, monospace",
  },
  fontSizes: [
    /** These are not tied to html elements ( see theme spec doc ) */
    12,
    14,
    16,
    20,
    24,
    32,
    48,
    64,
  ],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  letterSpacings: {
    body: "normal",
    caps: "0.2em",
  },

  /** Color Settings */
  colors: {
    /** key colour names within theme ui config. **/
    text: "#efefef",
    background: "#181818",
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
      fontSize: "1em",
      margin: "3em",
    },

    h1: {
      color: "secondary",
      fontFamily: "heading",
    },
  },
};
