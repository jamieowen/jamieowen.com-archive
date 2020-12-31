import React, { FC, Fragment } from "react";
import { Grid, Styled, Text } from "theme-ui";
import { MediaGrid } from "../components/media-grid";
import { ContentContainer } from "../components/common";

export const Home: FC<any> = ({}) => {
  return (
    <Fragment>
      <ContentContainer
        sx={{
          backgroundImage: "url(/assets/temp/Bitmap.png)",
          height: "100vh",
        }}
      >
        <Text variant="body_title" sx={{ textAlign: "center" }}>
          Hello. This is a corner of t'internet, for me, a creative technologist
          & software engineer. Click here for About. And here for work.
        </Text>
      </ContentContainer>
    </Fragment>
  );
};

export default Home;
