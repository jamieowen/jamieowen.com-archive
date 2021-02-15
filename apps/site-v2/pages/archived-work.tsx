import {
  Section,
  BodyText,
  Content,
  NextBackNavigation,
  PageHeaderNavigation,
} from "components/common";

export const ArchivedWork = () => {
  return (
    <Content>
      <Section>
        {/* <PageHeaderNavigation /> */}
        <BodyText>Archive</BodyText>
      </Section>
      <Section>
        <NextBackNavigation />
      </Section>
    </Content>
  );
};

export default ArchivedWork;
