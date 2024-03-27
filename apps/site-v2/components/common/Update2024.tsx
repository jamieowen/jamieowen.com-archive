import { FC, useMemo } from "react";
import { Box, useColorMode } from "theme-ui";
import { Container, Grid as _Grid, SxStyleProp, Text } from "theme-ui";
import { BodyTextLarge, BodyTextSmall, BodyText } from "./";

// Imported by IFrame
// export const headerHeight = "12rem"; //"66vh"; //"calc( 100vh - 30rem )";

const containerStyle: SxStyleProp = {
  width: "100%",
  maxWidth: ["90vw", "65vw"],
  borderRadius: "6px",
  //   height: headerHeight,
  //   position: "fixed",
  //   top: "0px",
  color: "white !important",
  marginBottom: "2rem",
  //   opacity: "1 !important;",
  backgroundColor: "#D63484",
  //   textAlign: "center",
  padding: ["1rem", "2rem"],
};

export const text2024Style: SxStyleProp = {
  color: "#D63484",
};

/* Fixed header containing menu */
export const Update2024: FC<{}> = ({ children }) => {
  return (
    <>
      <BodyText sx={text2024Style}>
        <br />
        Note: This site is due an update as of 2024. :)
        <br />
        As a quick update, my most recent work (2021-2024) is linked below.
      </BodyText>
    </>
  );
};
