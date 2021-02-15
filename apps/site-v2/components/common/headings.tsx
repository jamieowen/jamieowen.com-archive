import { FC, Fragment } from "react";
import { Box, Grid, Text } from "theme-ui";

type Align = "left" | "right";
export const GridAlign: FC<{ align: Align }> = ({
  children,
  align = "left",
}) => {
  const cols =
    align === "left" ? (
      <Fragment>
        <Box>{children}</Box>
        <Box></Box>
        <Box></Box>
      </Fragment>
    ) : (
      <Fragment>
        <Box></Box>
        <Box></Box>
        <Box>{children}</Box>
      </Fragment>
    );
  return (
    <Grid variant="grid_3" sx={{}}>
      {cols}
    </Grid>
  );
};

export const LargeParagraphHeading: FC<{ subtitle: string; align: Align }> = ({
  children,
  subtitle,
  align = "left",
}) => {
  return (
    <GridAlign align={align}>
      <Text as="h1" variant="subtitle_heading">
        {subtitle}
      </Text>
      <Text as="p" variant="body_title">
        {children}
      </Text>
    </GridAlign>
  );
};

export const SmallParagraphHeading: FC<{ subtitle: string; align: Align }> = ({
  children,
  subtitle,
  align = "left",
}) => {
  return (
    <GridAlign align={align}>
      <Text as="h1" variant="subtitle_heading">
        {subtitle}
      </Text>
      <Text as="p" variant="body_normal">
        {children}
      </Text>
    </GridAlign>
  );
};
