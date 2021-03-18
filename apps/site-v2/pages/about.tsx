import {
  BodyHeader,
  BodyLinkPrimary,
  BodyText,
  BodyTextLarge,
  Content,
  PageHeaderNavigation,
  Section,
  TechGridList,
} from "components/common";
import { Social } from "components/common/Social";
import { styles } from "components/theme/styles";
import { Styled } from "theme-ui";

export const Intro = () => {
  return (
    <Content>
      <Section maxWidth="medium">
        {/* <PageHeaderNavigation /> */}
        {/* <Social /> */}
        <BodyHeader>02 / About</BodyHeader>
        <BodyText>
          Hello. My name is Jamie. I'm a Creative Developer & Software Engineer
          based in London, UK. I enjoy making things with code and have 18+
          years experience using web technologies to build apps, installations &
          websites.
        </BodyText>
        {/* <BodyText>
          Starting computing in 1991, around the age of 9, I downloaded .txt
          files of the 'worlds' information from a{" "}
          <Styled.a href="http://bit.ly/3qRrKHI" target="_blank">
            BBS
          </Styled.a>{" "}
          running on some random guys computer using a 14.4k modem, MS-DOS and a
          program called{" "}
          <Styled.a href="http://bit.ly/3cuuW6E" target="_blank">
            Terminate.
          </Styled.a>
        </BodyText> */}
        {/* <br />
        <BodyText>
          Moving into programming a couple of years later in Basic, Turbo Pascal
          7 & Delphi. I then fell into the world of web programming and creative
          code with Actionscript & Macromedia Flash. Getting inspiration from my
          love of DJing, Detroit Techno,{" "}
          <Styled.a href="https://warp.net/" target="_blank">
            Warp Records,
          </Styled.a>{" "}
          Graphic Design, and the{" "}
          <Styled.a
            href="https://www.thedesignersrepublic.com/"
            target="_blank"
          >
            {" "}
            Designers Republic.
          </Styled.a>
          <br/>
        Moving to London in 2002, and after studying at the London College of
          Communication,
        </BodyText> */}
        <br />

        <BodyText>
          I've worked on various award-winning and award-losing projects
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
          <Styled.div
            sx={{
              textAlign: "center",
              color: "primary",
              width: "100%",
              a: { color: "primary" },
            }}
          >
            <BodyLinkPrimary href="mailto:hello@jamieowen.com" target="_blank">
              Get in Touch
            </BodyLinkPrimary>{" "}
            <BodyLinkPrimary
              href="https://github.com/jamieowen"
              target="_blank"
            >
              Github
            </BodyLinkPrimary>{" "}
            <BodyLinkPrimary
              href="https://www.linkedin.com/in/jamie-owen"
              target="_blank"
            >
              Linked In
            </BodyLinkPrimary>{" "}
          </Styled.div>
        </BodyText>
      </Section>
      <Section maxWidth="medium">
        <BodyHeader>02 / Tech</BodyHeader>
        <BodyText>
          As tech goes, I'm currently focused on all things
          Typescript/Javascript ES6; and proficient with{" "}
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

export default Intro;
