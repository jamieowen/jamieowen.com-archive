import {
  BodyHeader,
  BodyText,
  Content,
  PackagesGrid,
  PageHeaderNavigation,
  ProjectImageLinks,
  Section,
} from "components/common";

export { getStaticProps } from "services/get-static-paths";

import { packagesData } from "data/packages-data";
import { sketchesData } from "data/sketches-data";
import { RecentWork } from "components/content/RecentWork";

import { Fragment } from "react";
import { Styled } from "theme-ui";

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
        <BodyText>
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
        <BodyHeader>03 / Packages</BodyHeader>
        <BodyText>
          Code libraries currently being worked on. Forming the basis of
          sketches above. Will open source soon.
        </BodyText>
      </Section>
      <Section maxWidth="medium">
        <PackagesGrid root={packagesData} />
      </Section>
    </Content>
  );
};

export const Intro = ({ projects }) => {
  return (
    <Fragment>
      {/* <BodyHeader>01/02</BodyHeader> */}
      <BodyText>Hello.</BodyText>
      <br />

      <IntroContent />
      <br />

      <br />
      <br />
      <br />
      <BodyText>Recent Work</BodyText>
      <RecentWork projects={projects} />
      <br />
      <BodyText>Experimental</BodyText>
      <Sketches />

      <Packages />
    </Fragment>
    // <Content>
    //   <Section maxWidth="small"></Section>
    // </Content>
  );
};

export default Intro;
