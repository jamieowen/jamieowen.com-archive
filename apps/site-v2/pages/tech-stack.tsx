import {
  Section,
  BodyHeader,
  BodySmallText,
  BodyText,
  Button,
  Content,
} from "components/common";
import { TechGridList } from "components/slide-stack/GridList";

export const TechStack = () => {
  return (
    <Content>
      <Section maxWidth="small">
        <BodyHeader>02 / Tech Stack</BodyHeader>
        <BodyText>
          I've worked with a lot of frameworks, languages and platforms over the
          years but my typical focus is functional & object-oriented programming
          in Typescript/Javascript ES6. Here's some potentially confusing words
          that I think about daily.
        </BodyText>
      </Section>
      <Section maxWidth="medium">
        <TechGridList />
      </Section>
    </Content>
  );
};

export default TechStack;
