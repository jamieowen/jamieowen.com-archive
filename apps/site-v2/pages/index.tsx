import React, { FC, Fragment, forwardRef } from "react";
import { Motion, AnimatePropsFactory } from "../components/motion";
import { Flex, Box, Heading, Grid } from "theme-ui";
import { fetchPages, PageItem } from "../services/fetch-pages";
import { lorumIpsum } from "../components/helpers/lorumIpsum";
import { MyObj } from "../components/test-decorators";
import { GridDOMRender } from "../components/generative-grid";
import { GridGLRender } from "../components/generative-grid/GridGLRender";

const myObj = new MyObj();

type PageProps = {
  pages: PageItem[];
};

const ipsum = lorumIpsum();
const paragraphs = ipsum.generateParagraphs(7).split("\n");

const isectProps: AnimatePropsFactory = (ratio: number) => ({
  opacity: ratio === 1 ? 1 : 0,
});

export const Home: FC<PageProps> = ({ pages, ...props }) => {
  return (
    <Fragment>
      <GridGLRender />
      <Box
        sx={{ width: "64rem", position: "absolute", top: "0rem", left: "0rem" }}
      >
        <GridDOMRender sx={{ marginLeft: "-512px" }} />
        <Grid columns={[2, "1fr 1fr"]} gap="2rem">
          <Box bg="primary"></Box>
          <Box bg="primary">
            <Heading as="h1">
              I build tangible things with code; using web technologies & ideas.
            </Heading>
          </Box>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default Home;

{
  /* <Flex
        sx={{ width: "100%", alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={{ width: "1024px" }}>
          <Heading>Heading 1</Heading>
        </Box>
      </Flex> */
}
