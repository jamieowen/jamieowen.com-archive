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
    roboto: "'Roboto', sans-serif",
    worksans: "'Work Sans', sans-serif",
    body: "'Roboto', sans-serif'",
    heading: "'Work Sans', sans-serif",
    monospace: "Menlo, monospace",
  },

  fontSizes: [
    8, // h5 // root ( 1rem )
    12, // h4
    16, // h3
    24, // h2
    32, // h1
  ],
  fontWeights: {
    bold: 700,
    semibold: 600,
    regular: 400,
    light: 300,
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
    /** theme ui default **/
    text: "#efefef",
    background: "white",
    primary: "#efefef",
    secondary: "crimson",
    accent: "hotpink",
    highlight: "orange",
    // muted

    /** Custom */
    navigation_text: "#454545",
    navigation_bg: "transparent",

    /** Home */
    slide_1_text: "hotpink",
    slide_1_bg: "white",
    slide_2_text: "#222222",
    slide_2_bg: "indianred",
    slide_3_text: "#f2f2f2",
    slide_3_bg: "#1c1c1c",
    slide_4_text: "#454545",
    slide_4_bg: "#FEFF00",

    /** Additional modes for dark mode, light mode, etc. **/
    modes: {},
  },

  grids: {
    /** Navigation Bar Grid */
    navigation: {
      gap: "1rem",
      gridTemplateColumns: "1fr 2fr 1fr",
    },
    /** Main 4 Col Grid */
    primary: {
      width: "100%",
      gap: "1rem",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
    },
  },

  /** Variants **/
  /** Variants are custom style objects within a nested object key  **/
  /** They can then be used in sx={{variant:'buttons.primary'}} declarations */
  /** And are also tied to the default theme ui components */
  /** See spec. */

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
      opacity: 0.65,
      textTransform: "uppercase",
      marginBottom: "4rem",
    },

    /** Extra large intro paragraph */
    body_title: {
      fontFamily: "worksans",
      fontWeight: "semibold",
      lineHeight: "2rem",
      fontSize: 3,
    },
    body_normal: {},
  },
  buttons: {
    primary: {
      // etc
    },
  },

  /** Layout Variants */
  layout: {
    /** Wraps most top level content areas */
    content_center: {
      width: "1024px", // main column content
      // margin: "0px",
    },
    /** Top Navigation Bar */
    navigation: {
      height: "8rem",
      backgroundColor: "navigation_bg",
      position: "fixed",
      top: "0px",
      left: "0px",
      display: "flex",
      alignItems: "center",
    },
    /** Home slide / section area. */
    home_slide: {
      width: "100%",
      boxSizing: "border-box",
      height: "calc(100vh - 2rem)",
      // padding: "0rem",
      padding: "4rem 0rem",
      display: "flex",
      alignItems: "flex-end",
    },
  },

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

export default theme;
