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
      <BodyHeader>02 / Tech Stack</BodyHeader>
      <Section as="div" size="sml" nomargin>
        <BodySmallText>
          I've worked with a lot of frameworks, languages and platforms over the
          years but my typical focus is functional & object-oriented programming
          in Typescript/Javascript ES6. Here's some potentially confusing words
          that I think about daily.
          <br />
          <br />
        </BodySmallText>
      </Section>
      <Section as="div" size="mid">
        <TechGridList />
      </Section>
    </Content>
  );
};

export default TechStack;
