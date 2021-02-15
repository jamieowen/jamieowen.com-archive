import {
  Section,
  BodyText,
  Content,
  NextBackNavigation,
  PageHeaderNavigation,
} from "components/common";

export const GetInTouch = () => {
  return (
    <Content>
      <Section maxWidth="small">
        <PageHeaderNavigation />
        <BodyText>Get in touch</BodyText>
      </Section>

      <Section>
        <NextBackNavigation />
      </Section>
    </Content>
  );
};

export default GetInTouch;
