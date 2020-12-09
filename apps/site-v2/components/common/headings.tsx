import { FC, Fragment } from "react";
import { Box, Grid, Text } from "theme-ui";
import { BoxColumn } from "./containers";
import { Schedule } from "@jamieowen/motion-layout";
type Align = "left" | "right";
export const GridAlign: FC<{ align: Align }> = ({
  children,
  align = "left",
}) => {
  const cols =
    align === "left" ? (
      <Fragment>
        <BoxColumn>{children}</BoxColumn>
        <BoxColumn></BoxColumn>
        {/* <BoxColumn></BoxColumn> */}
      </Fragment>
    ) : (
      <Fragment>
        {/* <BoxColumn></BoxColumn> */}
        <BoxColumn></BoxColumn>
        <BoxColumn>{children}</BoxColumn>
      </Fragment>
    );
  return (
    <Grid variant="grid_2" sx={{}}>
      {cols}
    </Grid>
  );
};

// Extend Text.
export const ScheduledText: FC<any> = ({
  children,
  as = "h1",
  variant = "subtitle_heading",
}) => (
  <Schedule>
    {({ state }) => (
      <Text
        as={as}
        className={state === "mount" ? "visible" : "hidden"}
        variant={variant}
      >
        {children}
      </Text>
    )}
  </Schedule>
);

export const LargeParagraphHeading: FC<{ subtitle: string; align: Align }> = ({
  children,
  subtitle,
  align = "left",
}) => {
  return (
    <GridAlign align={align}>
      <ScheduledText as="h1" variant="subtitle_heading">
        {subtitle}
      </ScheduledText>
      <ScheduledText as="p" variant="body_title">
        {children}
      </ScheduledText>
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
      <ScheduledText as="h1" variant="subtitle_heading">
        {subtitle}
      </ScheduledText>
      <ScheduledText as="p" variant="body_normal">
        {children}
      </ScheduledText>
    </GridAlign>
  );
};
