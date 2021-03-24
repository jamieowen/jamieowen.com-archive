import { FC, useMemo } from "react";
import { Box, useColorMode } from "theme-ui";
import { Container, Grid as _Grid, ThemeUIStyleObject } from "theme-ui";

// Imported by IFrame
export const headerHeight = "12rem"; //"66vh"; //"calc( 100vh - 30rem )";

const headerStyle: ThemeUIStyleObject = {
  width: "100%",
  height: headerHeight,
  position: "fixed",
  top: "0px",
  pointerEvents: "none",
  textAlign: "center",
  padding: "2rem", //["2rem", "4rem"],
};

const contentContainerStyle: ThemeUIStyleObject = {
  position: "relative",
  // marginTop: headerHeight,
  // display: "flex",
  // justifyContent: "center",
  // alignItems: "center",
  // flexDirection: "column",
  width: "100%",
  overflow: "hidden",

  // minHeight: "calc( 100% - 2rem )",
  padding: ["2rem", "3rem"],
  backgroundColor: "content_background",
  color: "content_text",
};

const contentStyle: ThemeUIStyleObject = {
  width: "auto",
};

const footerStyle: ThemeUIStyleObject = {
  overflow: "hidden",
  // top: `calc( ${cl} - 2rem )`,
  // marginTop: "10rem",
  // position: "absolute",
  position: "relative",
  // bottom: ["2rem", "4rem"],

  // backgroundColor: "footer_background",
  minHeight: "8rem",
  padding: ["0rem 2rem", "0rem 4rem"], // now nested within content container
};

const sectionStyle: ThemeUIStyleObject = {
  // max widths are defined as classes in root style object.
  // width: "100%",
  // width: "auto !important",
  margin: "0px",
  marginBottom: "4rem",
};

const gridStyle: ThemeUIStyleObject = {
  gridTemplateColumns: ["1fr", "1fr 1fr"],
};

/* Fixed header containing menu */
export const Header: FC<{}> = ({ children }) => {
  return (
    <Box as="header" sx={headerStyle}>
      {children}
    </Box>
  );
};

/** Content Area. */
export const ContentContainer: FC<{}> = ({ children }) => {
  return (
    <Container id="content-container" sx={contentContainerStyle}>
      {children}
    </Container>
  );
};

/** Content wrapper for each page */
export const Content: FC<{}> = ({ children }) => {
  return (
    <Box as="section" sx={contentStyle}>
      {children}
    </Box>
  );
};

/** Content Area. */
export const Footer: FC<{}> = ({ children }) => {
  return (
    <Box as="footer" sx={footerStyle}>
      {children}
    </Box>
  );
};

/** Region of grouped content elements */
export const Section: FC<{
  // Max widths correspond to classes defined in the styles root object.
  maxWidth?: "small" | "medium" | "full";
}> = ({ children, maxWidth = "medium" }) => {
  const maxClass = `maxw-${maxWidth}`;
  return (
    <Box as="div" sx={sectionStyle} className={maxClass}>
      {children}
    </Box>
  );
};
