import {
  Section,
  BodyText,
  Content,
  PageHeaderNavigation,
} from "components/common";
import { InterestsGridList } from "components/common/GridList";

export const Interests = () => {
  return (
    <Content>
      <Section maxWidth="small">
        <PageHeaderNavigation />
        <BodyText>Text to follow...</BodyText>
      </Section>
      <Section maxWidth="medium">{/* <InterestsGridList /> */}</Section>
    </Content>
  );
};

export default Interests;
