import {
  BodyText,
  BodyTextLarge,
  Content,
  PageHeaderNavigation,
  Section,
  TechGridList,
} from "components/common";
import { Styled } from "theme-ui";

export const Intro = () => {
  return (
    <Content>
      <Section maxWidth="small">
        <PageHeaderNavigation />
        <BodyText>
          Hello. My name is Jamie. I'm a freelance Creative Developer & Software
          Engineer based in London, UK. I enjoy making things with code and have
          18+ years experience using web technologies to build apps,
          installations & websites.
        </BodyText>
        <BodyText>
          I'm lucky to have contracted as a lead developer on projects such as:
          an iOS/Android games portal app for{" "}
          <Styled.a href="/recent-work/pbs-gamesapp">
            PBS Kids with 10+ million downloads
          </Styled.a>
          , building 25+ touch screen installations for the{" "}
          <Styled.a href="/recent-work/national-museum-of-qatar">
            {" "}
            National Museum of Qatar
          </Styled.a>
          , and developing visualisation & prototyping solutions within{" "}
          <Styled.a href="/recent-work/lbg-systems-thinking">
            Systems Thinking at Lloyds Banking Group.
          </Styled.a>
        </BodyText>
        <BodyText>
          Please have a look at some{" "}
          <Styled.a href="/recent-work">Recent Work</Styled.a>, check my typical{" "}
          <Styled.a href="/tech-stack">Tech Stack</Styled.a>, or here are some
          general <Styled.a href="/interests">Interests</Styled.a> that make me
          tick otherwise!
        </BodyText>
      </Section>
      <Section maxWidth="small">
        <PageHeaderNavigation />
        <BodyText>
          Currently focused on all things Typescript/Javascript ES6. But I have
          experience working with Python, C++, C#, Adobe Flex {"& "} Flash AS3
          (RIP).
        </BodyText>
        <BodyText>
          Always learning new functional & object oriented programming concepts,
          algorithms, design patterns, reactive programming & test driven
          development.
        </BodyText>
        {/* <BodyText>
          And had and had a long history with various creative coding platforms.
        </BodyText> */}
      </Section>
      <Section maxWidth="small">
        <TechGridList />
      </Section>
    </Content>
  );
};

export default Intro;
