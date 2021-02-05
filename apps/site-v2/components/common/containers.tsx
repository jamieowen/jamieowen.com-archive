import { FC, useMemo } from "react";
import { useColorMode } from "theme-ui";
import { Container, Grid as _Grid, ThemeUIStyleObject } from "theme-ui";

// Center line of page fold
const cl = "50vh";
const headerStyle: ThemeUIStyleObject = {
  width: "100vw",
  height: cl,
  position: "fixed",
  top: "0px",
  zIndex: -1,
  backgroundColor: "background2",
  padding: ["2rem", "4rem"],
};

const contentContainerStyle: ThemeUIStyleObject = {
  position: "relative",

  // Shift to show just a fold of the main content
  // marginTop: "calc( 100vh - 2rem )",
  // Shift to show half way down the page
  marginTop: `calc( ${cl} - 0rem )`,
  minHeight: "calc( 100vh - 2rem )",
  padding: ["2rem", "4rem"],
  backgroundColor: "background",
};

const contentStyle: ThemeUIStyleObject = {};

const sectionStyle: ThemeUIStyleObject = {
  // max widths are defined as classes in root style object.
  width: "100%",
  margin: "0px",
  marginBottom: "4rem",
};

const gridStyle: ThemeUIStyleObject = {
  gridTemplateColumns: ["1fr", "1fr 1fr"],
};

/* Fixed header containing menu */
export const Header: FC<{}> = ({ children }) => {
  return (
    <Container as="section" sx={headerStyle}>
      {children}
    </Container>
  );
};

/** Content Area. */
export const ContentContainer: FC<{}> = ({ children }) => {
  return <Container sx={contentContainerStyle}>{children}</Container>;
};

/** Content wrapper for each page */
export const Content: FC<{}> = ({ children }) => {
  return (
    <Container as="div" sx={contentStyle}>
      {children}
    </Container>
  );
};

/** Region of grouped content elements */
export const Section: FC<{
  // Max widths correspond to classes defined in the styles root object.
  maxWidth?: "small" | "medium" | "full";
}> = ({ children, maxWidth = "medium" }) => {
  const maxClass = `maxw-${maxWidth}`;
  return (
    <Container as="section" sx={sectionStyle} className={maxClass}>
      {children}
    </Container>
  );
};

/** Grid being used on ProjectThumbs - need to add columns option */
export const Grid: FC<{}> = ({ children }) => {
  return <_Grid sx={gridStyle}>{children}</_Grid>;
};
