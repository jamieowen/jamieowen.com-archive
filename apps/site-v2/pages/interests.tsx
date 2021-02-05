import {
  Section,
  BodyHeader,
  BodySmallText,
  BodyText,
  Button,
  Content,
  NextBackNavigation,
  PageHeaderNavigation,
} from "components/common";
import { InterestsGridList } from "components/common/GridList";

export const Interests = () => {
  return (
    <Content>
      <Section maxWidth="small">
        <PageHeaderNavigation />
        <BodyText>I generally </BodyText>
      </Section>
      <Section maxWidth="medium">
        <InterestsGridList />
      </Section>
      <Section>
        <NextBackNavigation />
      </Section>
    </Content>
  );
};

export default Interests;
