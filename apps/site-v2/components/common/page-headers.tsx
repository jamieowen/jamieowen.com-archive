import React, { FC, ReactNode } from "react";
import { Box, Container, Flex, Grid, Text } from "theme-ui";
import { ContentContainer } from "./containers";
export const HeroHeader: FC<any> = ({ children }) => {
  return <ContentContainer>{children}</ContentContainer>;
};

export const PageHeader: FC<{
  children: () => {
    title: ReactNode;
    subtitle: ReactNode;
    short: ReactNode;
  };
}> = ({ children }) => {
  // USE PROPS OR THIS WEIRD METHOD!?
  const { subtitle, short, title } = children();
  return (
    <Container as="header" variant="header_normal">
      <Container variant="content_center">
        <Grid columns="1fr 1fr 1fr">
          <Box>
            {/* <Text as="h1" variant="subtitle_heading">
              {"< Back"}
            </Text> */}
            <Text as="h1" variant="subtitle_heading">
              {subtitle}
            </Text>
            <Text variant="body_title">{title}</Text>
          </Box>
          <Box></Box>
          <Box>
            {/* <img src="/assets/svg/github.svg" sx={{ width: "1rem" }} /> */}
          </Box>
        </Grid>
      </Container>
    </Container>
  );
};
