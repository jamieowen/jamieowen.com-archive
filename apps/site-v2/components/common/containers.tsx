import { FC } from "react";
import { Container, Grid as _Grid, ThemeUIStyleObject } from "theme-ui";

const headerStyle: ThemeUIStyleObject = {
  width: "100vw",
  height: "100vh",
  position: "fixed",
  top: "0px",
  zIndex: -1,
  backgroundColor: "background2",
  padding: "4rem",
};

const contentContainerStyle: ThemeUIStyleObject = {
  marginTop: "calc( 30vh - 2rem )",
  minHeight: "100vh",
  padding: "4rem",
  backgroundColor: "background",
};

const contentStyle: ThemeUIStyleObject = {};

const gridStyle: ThemeUIStyleObject = {
  gridTemplateColumns: "1fr 1fr",
};

/* Fixed header containing menu */
export const Header: FC<{}> = ({ children }) => {
  return <Container sx={headerStyle}>{children}</Container>;
};

/** Content Area. */
export const ContentContainer: FC<{}> = ({ children }) => {
  return <Container sx={contentContainerStyle}>{children}</Container>;
};

/** Content wrapper for each page */
export const Content: FC<{}> = ({ children }) => {
  return <Container sx={contentStyle}>{children}</Container>;
};

export const Grid: FC<{}> = ({ children }) => {
  return <_Grid sx={gridStyle}>{children}</_Grid>;
};
