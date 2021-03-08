import { useScrollContext } from "components/context/ScrollContext";
import { FC, useState } from "react";
import { Box, Styled } from "theme-ui";
import { LoaderContainer } from "./LoaderContainer";
import { headerHeight } from "./containers";

export const ContentIFrame: FC<{ height?: string }> = ({
  height = headerHeight,
}) => {
  const [loading, setLoading] = useState(true);
  const scroll = useScrollContext();
  const vis = 1 - scroll.headerVisibility;

  return (
    <Box
      onClick={() => setLoading(!loading)}
      style={{
        transition: "translate 0.3s ease-out",
        transformOrigin: "0% 0%",
        // filter: `brightness(${1 - vis * 0.8})`,
        transform: `translate(0px,${vis * -10}%)`,
      }}
      sx={{
        position: "fixed",
        pointerEvents: "none",
        top: 0,
        left: 0,
        width: "100%",
        height: height,
        backgroundColor: "black",
      }}
    >
      <LoaderContainer visible={loading}>
        <Box
          as="iframe"
          // width="100%"
          // height="100%"
          // frameBorder={0}
          sx={{ border: 0, width: "100%", height: "100%" }}
          onLoadStart={() => setLoading(true)}
          onLoad={() => setLoading(false)}
          // src="http://localhost:8081/gpgpu-state.html"
        ></Box>
      </LoaderContainer>
    </Box>
  );
};
