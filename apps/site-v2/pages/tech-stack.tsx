import {
  Section,
  BodyText,
  Content,
  NextBackNavigation,
  PageHeaderNavigation,
} from "components/common";
import { TechGridList } from "components/common/GridList";

export const TechStack = () => {
  return (
    <Content>
      <Section maxWidth="small">
        <PageHeaderNavigation />
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
      <Section>
        <NextBackNavigation />
      </Section>
    </Content>
  );
};

export default TechStack;
