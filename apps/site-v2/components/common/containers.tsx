import React, { FC } from "react";
import { Flex, Box, Heading, Grid, Styled, Container, Text } from "theme-ui";

/**
 *
 * PHASE OUT....
 * Hero container with customisable full with outer container.
 * Along with inner center column content container.
 * @param param0
 */
export const HeroContainer: FC<{
  bgColor?: string;
  textColor?: string;
}> = ({ bgColor = "slide_1_bg", textColor = "slide_1_text", children }) => {
  // extra bg color props,
  // and text color props.
  // color / text inversion.

  // CHANGE TO NEW TEXT IDEA...
  return (
    <Container
      as="section"
      variant="content_hero"
      bg={bgColor}
      color={textColor}
    >
      <Container variant="content_center">{children}</Container>
    </Container>
  );
};

/**
 *
 */
export const ContentContainer: FC<{ swatch?: string; header?: boolean }> = ({
  children,
  header = false,
  swatch = null,
}) => {
  const text = swatch ? `${swatch}_text` : null;
  const bg = swatch ? `${swatch}_bg` : null;
  const element = header ? "header" : "section";
  const variant = header ? "content_stretch_header" : "content_stretch";
  return (
    <Container as={element} variant={variant} bg={bg} color={text}>
      <Container variant="content_center">{children}</Container>
    </Container>
  );
};

/**
 *
 * // PHASE THIS OUT
 *
 *
 * Hero style type for use on home page.
 * @param param0
 */
export const HeroType: FC<{
  column?: number;
  title?: string;
}> = ({ children, title = "Subtitle", column = 0 }) => {
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

  return <Grid variant="primary">{columns}</Grid>;
};
