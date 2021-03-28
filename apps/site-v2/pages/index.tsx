import {
  BodyHeader,
  BodyText,
  Content,
  PackagesGrid,
  Section,
  TechGridList,
} from "components/common";

export { getStaticProps } from "services/get-static-paths";

import { packagesData } from "data/packages-data";
import { sketchesData } from "data/sketches-data";
import { RecentWork } from "components/content/RecentWork";

import { Fragment } from "react";
import { Container, Grid, Styled, Text } from "theme-ui";

export const IntroContent = () => {
  return (
    <Content>
      <Section>
        <BodyText>
          My name is Jamie. I'm a Creative Developer & Software Engineer based
          in London, UK. I enjoy making things with code and have 18+ years
          experience using web technologies to build apps, installations &
          websites.
        </BodyText>
        <br />
        <BodyText>
          I've worked on various award-winning and happily award-losing projects
          including an iOS/Android games portal for{" "}
          <Styled.a href="/work/pbs-gamesapp">
            PBS Kids achieving 10+ million downloads
          </Styled.a>
          . Building 25+ touch screen installations for the{" "}
          <Styled.a href="/work/national-museum-of-qatar">
            {" "}
            National Museum of Qatar
          </Styled.a>
          . Developing visualisation & prototyping solutions within{" "}
          <Styled.a href="/work/lbg-systems-thinking">
            Systems Thinking at Lloyds Banking Group
          </Styled.a>
          , and creating{" "}
          <Styled.a href="/work/nexus-thescript">
            mobile VR experiences
          </Styled.a>{" "}
          at Nexus Interactive Arts.
        </BodyText>
        <br />
        <BodyText>
          Always feeling like a{" "}
          <Styled.a
            href="https://en.wikipedia.org/wiki/Shoshin"
            target="_blank"
          >
            healthy noob
          </Styled.a>
          , I'm continuously learning new functional & object oriented
          programming concepts, algorithms and design patterns. With an interest
          in combining interaction, animation, generative art & design with
          code.
        </BodyText>
        <br />
        <BodyText>
          Thanks for dropping by and scroll down to see a mix of commercial and
          personal projects. + details on current technical expertise.
        </BodyText>
        <br />
        <BodyText as="div">
          <Styled.div
            sx={{
              textAlign: "center",
              color: "primary",
              width: "100%",
              a: { color: "primary" },
            }}
          >
            <Styled.a href="mailto:hello@jamieowen.com" target="_blank">
              Get in Touch
            </Styled.a>{" "}
            <Styled.a href="https://github.com/jamieowen" target="_blank">
              Github
            </Styled.a>{" "}
            <Styled.a
              href="https://www.linkedin.com/in/jamie-owen"
              target="_blank"
            >
              Linked In
            </Styled.a>{" "}
          </Styled.div>
        </BodyText>
      </Section>
    </Content>
  );
};

export const TechContent = () => {
  return (
    <Content>
      <Section maxWidth="medium">
        <BodyText>
          I'm currently focused on all things Typescript/Javascript ES6; and
          proficient with{" "}
          <Styled.a href="https://reactjs.org/" target="_blank">
            React
          </Styled.a>
          ,{" "}
          <Styled.a href="https://threejs.org/" target="_blank">
            Three.js
          </Styled.a>
          ,{" "}
          <Styled.a href="https://www.pixijs.com/" target="_blank">
            Pixi.js
          </Styled.a>{" "}
          and more recently{" "}
          <Styled.a href="https://thi.ng/" target="_blank">
            thi.ng.
          </Styled.a>{" "}
          I also have experience working with Python, C++, C#, and previously
          Adobe Flex {"& "} Flash AS3 (RIP).
        </BodyText>
        <br />
        <BodyText>
          A less than 😅 exhaustive list of tech that regularly occupies my
          brain includes:
        </BodyText>
      </Section>
      <Section maxWidth="medium">
        <TechGridList />
      </Section>
      {/* <Section maxWidth="medium">
        <BodyHeader>02 / Interests</BodyHeader>
      </Section> */}
    </Content>
  );
};

export const Sketches = () => {
  return (
    <Content>
      <Section maxWidth="medium">
        <PackagesGrid root={sketchesData} />
      </Section>
    </Content>
  );
};

export const Packages = () => {
  return (
    <Content>
      <Section maxWidth="small">
        {/* <BodyHeader>03 / Packages</BodyHeader> */}
        <Grid variant="grid_2">
          <Text variant="body_small" className="opq75">
            Some npm package examples from personal libraries being worked on.
            Will open source soon.
          </Text>
        </Grid>
      </Section>
      <Section maxWidth="medium">
        <PackagesGrid root={packagesData} />
      </Section>
    </Content>
  );
};

const HeaderDivider = ({ children }) => {
  return (
    <Container variant="divider_header" className="opq5">
      {children}
    </Container>
  );
};
export const Intro = ({ projects }) => {
  return (
    <Fragment>
      <HeaderDivider>
        <BodyText>Hello.</BodyText>
      </HeaderDivider>
      <IntroContent />

      <HeaderDivider>
        <BodyText>Recent Work</BodyText>
      </HeaderDivider>
      <RecentWork projects={projects} />
      <HeaderDivider>
        <BodyText>Tech</BodyText>
      </HeaderDivider>
      <TechContent />
      <HeaderDivider>
        <BodyText>Experimental</BodyText>
      </HeaderDivider>
      <Sketches />
      <HeaderDivider>
        <BodyText>Packages</BodyText>
      </HeaderDivider>
      <Packages />
    </Fragment>
  );
};

export default Intro;
