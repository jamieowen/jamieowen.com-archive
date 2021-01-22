import { FC, Fragment } from "react";
import { Box, Grid, Text } from "theme-ui";
import { BoxColumn } from "./containers";
// import { Layout } from "@jamieowen/motion-layout";
type Align = "left" | "right";

const Layout: FC<any> = ({ children }) => <div>{children}</div>;

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

export const FullWidthCap: FC<any> = ({ children }) => {
  return (
    <Grid variant="grid_cap">
      <Box>{children}</Box>
      <Box></Box>
    </Grid>
  );
};

// Extend Text.
export const ScheduledText: FC<any> = ({
  children,
  as = "h1",
  variant = "subtitle_heading",
}) => (
  <Layout>
    {({ ref, state }) => {
      // console.log("STATE : ", state);
      return (
        <div ref={ref} className={state.visibility}>
          <Text as={as} variant={variant}>
            {children}
          </Text>
        </div>
      );
    }}
  </Layout>
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

export const LargeParagraphFullWidth: FC<{
  subtitle: string;
}> = ({ children, subtitle }) => {
  return (
    <FullWidthCap>
      <ScheduledText as="h1" variant="subtitle_heading">
        {subtitle}
      </ScheduledText>
      {children}
    </FullWidthCap>
  );
};
