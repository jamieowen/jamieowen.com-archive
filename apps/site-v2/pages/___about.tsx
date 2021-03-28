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
import { Styled } from "theme-ui";
// import styled from "styled-components";

// const Content = styled.div`
//   background-color: blue;
// `;

{
  /* <BodyText>
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
        </BodyText> */
}
{
  /* <br />
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
        </BodyText> */
}
// <br />

export const TechContent = () => {
  return (
    <Content>
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

export default () => {
  return <div>Hello</div>;
};
