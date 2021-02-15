/** @jsx jsx */
import { jsx } from "theme-ui";
import { FC } from "react";
import { Grid, Box, Flex } from "theme-ui";

type TextColumnProps = {
  heading: string;
  body: string | string[];
};

const sxColumnFlex = {
  minHeight: "50vh",
  alignItems: "center",
};

const sxGrid = {
  width: "100%",
};

export const TextColumnLeft: FC<TextColumnProps> = ({
  heading,
  body,
  ...children
}) => {
  return (
    <Flex sx={sxColumnFlex}>
      <Grid columns="2fr 1fr" sx={sxGrid}>
        <Box>
          <h1>{heading.toString()}</h1>
          <p>{body.toString()}</p>
        </Box>
        <Box></Box>
      </Grid>
    </Flex>
  );
};

export const TextColumnRight: FC<TextColumnProps> = ({
  heading,
  body,
  ...children
}) => {
  return (
    <Flex sx={sxColumnFlex}>
      <Grid columns="1fr 2fr" sx={sxGrid}>
        <Box></Box>
        <Box>
          <h1>{heading}</h1>
          <p>{body}</p>
        </Box>
      </Grid>
    </Flex>
  );
};
