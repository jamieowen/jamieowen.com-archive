import React, { FC, Fragment, ReactNode } from "react";
import {
  BlockType,
  ContentContainer,
  PageHeader,
} from "../../components/common";
import { Grid, Text } from "theme-ui";
import {
  LargeParagraphHeading,
  SmallParagraphHeading,
} from "../../components/common/headings";

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

export const About: FC<any> = () => {
  return (
    <Fragment>
      <ContentContainer swatch="primary" header>
        <LargeParagraphHeading subtitle="Sapient Razorfish" align="left">
          Creative technologist & software engineer and all round nice chap.
          Hello.
        </LargeParagraphHeading>
        <SmallParagraphHeading subtitle="Overview" align="right">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          ullamcorper quam vitae ipsum pellentesque feugiat. Curabitur lorem
          lectus, imperdiet non congue vel, iaculis sit amet nunc. Integer
          rhoncus elit et dolor hendrerit, sed interdum elit aliquam. Phasellus
          sit amet quam vulputate, euismod leo in, aliquet ante.
        </SmallParagraphHeading>
      </ContentContainer>
      <ContentContainer swatch="secondary">
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
