import { FC, useState } from "react";
import { Styled, Box, Spinner } from "theme-ui";

export const LoaderContainer: FC<{
  visible: boolean;
  spinner?: "small" | "regular";
}> = ({ visible, children, spinner = "regular" }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#111111",
        ".cover": {
          width: "100%",
          height: "100%",

          top: 0,
          left: 0,
          position: "absolute",
          backgroundColor: "#111111",
          // zIndex: 1,
          transitionDelay: "0.3s",
          transformOrigin: "0% 0%",
          transform: "scale(2.0,2.0) rotate(0deg)",
          transition: "transform 1.4s cubic-bezier(0.85, 0, 0.15, 1)",
        },
        ".hidden": {
          transform: "scale(0.5,2.0) rotate(85deg)",
          transformOrigin: "0% 0%",
        },
        ".spin-hide": {
          opacity: 0,
        },
      }}
    >
      {children}
      <Box
        className={visible ? "cover" : "cover hidden"}
        sx={
          {
            // transform: "scale(0.5,1) rotate(35deg)",
          }
        }
      ></Box>
      <Spinner
        className={!visible ? "spin-hide" : ""}
        sx={{
          position: "absolute",
          bottom: spinner === "regular" ? "2rem" : "1rem",
          width: spinner === "regular" ? "48px" : "32px",
          left: spinner === "regular" ? "2rem" : "1rem",
          transition: "opacity 1s ease-out",
          transitionDelay: "0.7s",
        }}
        strokeWidth={2}
        speed={2}
      />
    </Box>
  );
};
