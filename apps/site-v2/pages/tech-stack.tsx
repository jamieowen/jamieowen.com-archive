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
      <Section maxWidth="medium">
        <TechGridList />
      </Section>
    </Content>
  );
};

export default TechStack;
