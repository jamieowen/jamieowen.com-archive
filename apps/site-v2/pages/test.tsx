import {
  FC,
  ReactNode,
  Children,
  cloneElement,
  ComponentType,
  ReactElement,
  Fragment,
  useState,
} from "react";
import { SlideStack } from "../components/slide-stack/SlideStack";
import { Layout } from "@jamieowen/motion-layout";
import { paletteGradientHSL, colorAsCSS } from "@jamieowen/color";
import { motion } from "framer-motion";

import { Text, Styled, Container } from "theme-ui";
import { useColorContext } from "components/context/ColorContext";

const grad = paletteGradientHSL([0.2, 0.5, 0.5], [1, 1, 1], 5);
const SplitText: FC<{ children: ReactNode }> = ({ children }) => {
  console.log("CHILDREN", children);
  const mappedChildren = Children.map(children, (node: ReactElement, i) => {
    console.log("CHILD", typeof node, node);
    if (typeof node === "object") {
      console.log("clone");
      return cloneElement(node, {
        ...node.props,
        style: {
          color: colorAsCSS(grad[i % (grad.length - 1)]),
        },
      });
    } else {
      return node;
    }
  });

  return (
    <Text
      variant="body_title"
      sx={{
        fontFamily: "roboto",
        fontSize: "32px",
        fontWeight: "regular",
        letterSpacing: "0.15rem",
        lineHeight: "3rem",
        "em,strong": {
          fontStyle: "normal",
          fontWeight: "regular",
        },
      }}
    >
      {mappedChildren}
    </Text>
  );
};

type SlidePosition = "top" | "middle" | "bottom" | "hidden";
const slidePositions: { [K in SlidePosition] } = {
  top: "0%",
  middle: "33.33%",
  bottom: "66.66%",
  hidden: "calc( 100% - 10px )",
};
const slidePosition = (pos: SlidePosition) => slidePositions[pos];

export const Slide: FC<{
  zIndex: number;
  colorIndex: number;
  position: SlidePosition;
}> = ({ children, position, zIndex, colorIndex = 0 }) => {
  const [pos, setPosition] = useState(position);
  const color = useColorContext();
  const bgColor = color.palette.backgroundRange[colorIndex];
  return (
    <motion.div
      style={{ position: "absolute", width: "100%", height: "100%", zIndex }}
      animate={{
        y: slidePosition(pos),
        transition: {
          duration: 0.8,
          ease: "anticipate",
        },
      }}
      onClick={() => setPosition(pos !== "hidden" ? "hidden" : position)}
    >
      <Container
        sx={{
          position: "absolute",
          top: "0%",
          width: "100%",
          height: "100%",
          backgroundColor: bgColor, //"#002F32",
          padding: "4rem",
          // overflow: "scroll",
        }}
      >
        {children}
      </Container>
    </motion.div>
  );
};
export const IntroSlide: FC<any> = () => {
  return (
    <Slide colorIndex={0} zIndex={0} position="top">
      <SplitText>
        <strong>Hello.</strong> You’ve reached the website of Jamie Owen, A{" "}
        <em>Creative Technologist</em> & <em>Software Engineer </em>based in
        London, UK. I have 18+ years of experience working with a range of
        coding platforms building creative web software for installations,
        mobile and desktop. Read more Below. Use your mouse or thumb pointer to
        interact with these digital words. Shuffle some Color Palettes. Select
        something at random. Or generate garbage. Once you are done, you get the
        idea. Some recent projects & endeavours include <br />
        Systems Thinking @ Lloyds Banking Group, Installations for National
        Museum of Qatar @ AllOfUs, Google Livecase
      </SplitText>
    </Slide>
  );
};

export const DetailSlide: FC<any> = ({ ...props }) => {
  return (
    <Slide colorIndex={1} zIndex={1} position="middle">
      <SplitText>
        <strong>Projects.</strong>
        <em>Creative Technologist</em> & <em>Software Engineer </em>based in
        Further detail on CNN Airwars.
      </SplitText>
    </Slide>
  );
};

export const Home: FC<any> = () => {
  return (
    <Container
      sx={{
        width: "100%",
        height: "100%",
        position: "fixed",
        overflow: "hidden",
      }}
    >
      <IntroSlide />
      <DetailSlide />
    </Container>
  );
};

export const Home2: FC<any> = () => {
  return (
    <SlideStack>
      <SplitText>
        <strong>Hello.</strong> You’ve reached the website of Jamie Owen, A{" "}
        <em>Creative Technologist</em> & <em>Software Engineer </em>based in
        London, UK. I have 18+ years of experience working with a range of
        coding platforms building creative web software for installations,
        mobile and desktop. Read more Below. Use your mouse or thumb pointer to
        interact with these digital words. Shuffle some Color Palettes. Select
        something at random. Or generate garbage. Once you are done, you get the
        idea. Some recent projects & endeavours include <br />
        Systems Thinking @ Lloyds Banking Group, Installations for National
        Museum of Qatar @ AllOfUs, Google Livecase
      </SplitText>
      <SplitText>
        <strong>Projects.</strong>
        <em>Creative Technologist</em> & <em>Software Engineer </em>based in
        Further detail on CNN Airwars.
      </SplitText>
      <SplitText>
        <strong>Projects.</strong>
      </SplitText>
    </SlideStack>
  );
};

export default Home2;
