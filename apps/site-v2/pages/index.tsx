import React, { FC, Fragment, forwardRef } from "react";
import { Flex, Box, Heading, Grid, Styled, Container, Text } from "theme-ui";
import { fetchPages, PageItem } from "../services/fetch-pages";

type PageProps = {
  pages: PageItem[];
};

const Slide: FC<{
  bgColor?: string;
  column?: number;
  title?: string;
  textColor?: string;
}> = ({
  children,
  bgColor = "slide_1_bg",
  textColor = "slide_1_text",
  title = "Subtitle",
  column = 0,
}) => {
  const columns = new Array(4).fill(0).map((v, i) => {
    return (
      <Box key={i}>
        {i == column ? (
          <Text as="h1" variant="subtitle_heading">
            {title}
          </Text>
        ) : (
          <Text as="p" variant="subtitle_heading">{`0${i + 1}`}</Text>
        )}
        {i == column ? <Text variant="body_title">{children}</Text> : null}
      </Box>
    );
  });

  return (
    <Container as="section" variant="home_slide" bg={bgColor} color={textColor}>
      <Container variant="content_center" data-info="center">
        <Grid variant="primary">{columns}</Grid>
      </Container>
    </Container>
  );
};

export const Home: FC<PageProps> = ({ pages, ...props }) => {
  return (
    <Fragment>
      <Slide
        bgColor="slide_1_bg"
        textColor="slide_1_text"
        column={0}
        title="Intro"
      >
        Hello, my name is <Styled.em>Jamie Owen,</Styled.em> I am a software
        engineer & creative technologist.
      </Slide>
      <Slide
        bgColor="slide_2_bg"
        textColor="slide_2_text"
        column={1}
        title="About"
      >
        I like to build software, installations with code. I build{" "}
        <Styled.em>tangible</Styled.em> things with code; using web
        technologies.
      </Slide>
      <Slide
        bgColor="slide_3_bg"
        textColor="slide_3_text"
        column={2}
        title="Tech"
      >
        I build tangible things with code; using web technologies & ideas.
      </Slide>
      <Slide
        bgColor="slide_4_bg"
        textColor="slide_4_text"
        column={3}
        title="Get in Touch"
      >
        I build tangible things with code; using web technologies & ideas.
      </Slide>
    </Fragment>
  );
};

export default Home;
