import React, { FC, Fragment, ReactNode } from "react";
import {
  BlockType,
  ContentContainer,
  PageHeader,
} from "../../components/common";
// import { Layout } from "@jamieowen/motion-layout";
import { Grid, Text } from "theme-ui";
import {
  LargeParagraphFullWidth,
  LargeParagraphHeading,
  SmallParagraphHeading,
} from "../../components/common/headings";

const Layout: FC<any> = ({ children }) => <div>{children}</div>;

const mapAlternateEmphasis = (x: string, i: number): ReactNode =>
  i % 2 ? (
    <Text key={i} as="span" sx={{ opacity: 0.8, fontWeight: "regular" }}>
      _{x}{" "}
    </Text>
  ) : (
    <Text key={i} as="span" variant="">
      __{x}{" "}
    </Text>
  );

const mapBlock = (x: string, i: number): ReactNode => (
  <Layout>
    {({ state, ref }) => (
      <Text
        ref={ref}
        as="span"
        variant="body_title"
        className={state.visibility}
      >
        {x}{" "}
      </Text>
    )}
  </Layout>
);

export const About: FC<any> = () => {
  return (
    <Fragment>
      <ContentContainer
        swatch="primary"
        header
        sx={{
          backgroundImage: "url(/assets/temp/Bitmap.png)",
          height: "100vh",
        }}
      >
        <LargeParagraphFullWidth subtitle="About">
          {"Hello. I am Jamie Owen. A Creative technologist & software engineer based in London. Hello. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper quam vitae ipsum pellentesque feugiat. Integer rhoncus elit et dolor hendrerit, sed interdum elit aliquam. Phasellus sit amet quam vulputate, euismod leo in, aliquet ante."
            .split(" ")
            .map(mapBlock)}
        </LargeParagraphFullWidth>
        {/* <SmallParagraphHeading subtitle="Overview" align="left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          ullamcorper quam vitae ipsum pellentesque feugiat. Curabitur lorem
          lectus, imperdiet non congue vel, iaculis sit amet nunc. Integer
          rhoncus elit et dolor hendrerit, sed interdum elit aliquam. Phasellus
          sit amet quam vulputate, euismod leo in, aliquet ante.
        </SmallParagraphHeading> */}
        {/* </ContentContainer>
      <ContentContainer swatch="primary"> */}
        <SmallParagraphHeading subtitle="Technology" align="left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          ullamcorper quam vitae ipsum pellentesque feugiat. Curabitur lorem
          lectus, imperdiet non congue vel, iaculis sit amet nunc. Integer
          rhoncus elit et dolor hendrerit, sed interdum elit aliquam. Phasellus
          sit amet quam vulputate, euismod leo in, aliquet ante.
        </SmallParagraphHeading>
        <Grid variant="grid_2">
          <BlockType title="Current Focus">
            {[
              "Javascript ES6",
              "Typescript",
              "Next.js",
              "React",
              "Redux",
              "Node.js",
              "Three.js",
              "Thi.ng",
              "Pixi.js",
              "WebGL",
              "GLSL",
              "React Three Fiber",
              "Express",
              "Jamstack",
              "Webpack",
              "Node based build systems",
            ].map(mapAlternateEmphasis)}
          </BlockType>
          <BlockType title="Occasionally">
            {[
              "Python",
              "C#",
              "Pandas",
              "Scypy",
              "Jupyter Notebooks",
              "Open CV",
              "Django",
              "Maya",
              "Framer",
              "Photoshop",
              "Sketch",
            ].map(mapAlternateEmphasis)}
          </BlockType>
        </Grid>
      </ContentContainer>
      <ContentContainer swatch="tertiary">
        <SmallParagraphHeading subtitle="Interests" align="left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          ullamcorper quam vitae ipsum pellentesque feugiat.
        </SmallParagraphHeading>
      </ContentContainer>
    </Fragment>
  );
};

export default About;
