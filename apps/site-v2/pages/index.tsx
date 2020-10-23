import React, { FC, Fragment, forwardRef } from "react";
import { Motion, AnimatePropsFactory } from "../components/motion";
import { Flex, Box } from "theme-ui";

// import { MatterBody } from "../components/physics/MatterBody";
// import { MatterProvider } from "../components/physics/MatterContext";
// import { MatterRenderer } from "../components/physics/MatterRenderer";
// import { TextColumnLeft, TextColumnRight } from "../components/TextColumns";
import { ThreeRenderer } from "../components/three/ThreeRenderer";
import { fetchPages, PageItem } from "../services/fetch-pages";
import { lorumIpsum } from "../components/helpers/lorumIpsum";
import { MyObj } from "../components/test-decorators";

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
    <Flex
      sx={{ width: "100%", alignItems: "center", justifyContent: "center" }}
    >
      <Box sx={{ width: "40%" }}>
        <Motion>
          <h1>Heading 1</h1>
        </Motion>
        <Motion>
          <h2>Heading 2</h2>
        </Motion>
        <Motion>
          <h3>Heading 3</h3>
        </Motion>
        <Motion>
          <h4>Heading 4</h4>
        </Motion>
        <Motion>
          <h5>Heading 5</h5>
        </Motion>

        {paragraphs.map((p, i) => (
          <Motion key={i}>
            <p>{p}</p>
          </Motion>
        ))}
        <Motion>
          <h1>Heading End</h1>
        </Motion>
      </Box>
    </Flex>
  );
};

export default Home;

// const Inline = forwardRef((props, ref) => {
//   return (
//     <span ref={ref} style={{ display: "inline-block" }}>
//       {props.children}
//     </span>
//   );
// });

//   {/* <MatterRenderer /> */}
//   {/* <ThreeRenderer /> */}
//   {/* <MatterBody>
//   <Inline>Hello Matter</Inline>
// </MatterBody>

// <MatterBody>
//   <Inline>Hello There</Inline>
// </MatterBody>
// <TextColumnLeft
//   heading="Hello"
//   body="I'm Jamie, a Creative Dev based in London"
// />

// <TextColumnRight heading="Hello" body="alskdasdas" />

// <TextColumnLeft heading="Build" body="4342323" /> */}
