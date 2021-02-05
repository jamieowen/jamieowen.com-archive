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
          Currently focused on all things Typescript/Javascript ES6. Including
          functional & object oriented programming styles, design patterns,
          reactive programming, test driven development and various creative
          coding platforms.
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
