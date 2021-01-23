import { Theme } from "theme-ui";

export const fonts: Pick<
  Theme,
  "fonts" | "fontWeights" | "lineHeights" | "fontSizes" | "letterSpacings"
> = {
  fonts: {
    roboto: "'Roboto Mono', sans-serif",
    worksans: "'Work Sans', sans-serif",
    body: "'Roboto Mono', sans-serif'",
    heading: "'Work Sans', sans-serif",
    monospace: "Menlo, monospace",
  },
  fontWeights: {
    bold: 700,
    semibold: 600,
    medium: 500,
    regular: 400,
    light: 300,
  },
  fontSizes: [
    8, // h5 // root ( 1rem )
    12, // h4
    16, // h3
    24, // h2
    32, // h1
    40, // h0
  ],
  lineHeights: {
    body: 1.5,
    heading: "6rem",
  },
  letterSpacings: {
    body: "normal",
    caps: "0.2em",
  },
};
