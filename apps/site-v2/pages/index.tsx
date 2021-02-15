import React, { FC, Fragment } from "react";
import { Grid, Styled, Text } from "theme-ui";
import { MediaGrid } from "../components/media-grid";
import {
  ContentContainer,
  HeroContainer,
  HeroHeader,
  HeroType,
} from "../components/common";

export const Home: FC<any> = ({}) => {
  return (
    <Fragment>
      <HeroHeader bgColor="slide_1_bg" textColor="slide_1_text">
        <HeroType column={0} title="Intro">
          Hello, my name is <Styled.em>Jamie Owen,</Styled.em> I am a software
          engineer & creative technologist.
        </HeroType>
      </HeroHeader>
      <HeroContainer bgColor="slide_2_bg" textColor="slide_2_text">
        <HeroType column={0} title="Intro">
          Hello, my name is <Styled.em>Jamie Owen,</Styled.em> I am a software
          engineer & creative technologist.
        </HeroType>
      </HeroContainer>
      <HeroContainer bgColor="slide_3_bg" textColor="slide_3_text">
        <HeroType column={0} title="Intro">
          Hello, my name is <Styled.em>Jamie Owen,</Styled.em> I am a software
          engineer & creative technologist.
        </HeroType>
      </HeroContainer>
      <HeroContainer bgColor="slide_4_bg" textColor="slide_4_text">
        <HeroType column={0} title="Intro">
          Hello, my name is <Styled.em>Jamie Owen,</Styled.em> I am a software
          engineer & creative technologist.
        </HeroType>
      </HeroContainer>

      {/** Selected Work */}
      <ContentContainer>
        <Text as="h1" variant="subtitle_heading">
          Selected Work
        </Text>
        <Grid variant="primary">
          <Text variant="body_title">
            Have a browse of some fairly recent projects
          </Text>
          {/* <Box>Some extra big content</Box> */}
        </Grid>
        <MediaGrid media={[]} />
      </ContentContainer>
    </Fragment>
  );
};

export default Home;
