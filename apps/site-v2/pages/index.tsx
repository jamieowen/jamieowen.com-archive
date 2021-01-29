import {
  BodyText,
  Content,
  NextBackNavigation,
  PageHeaderNavigation,
  Section,
} from "components/common";

export const Intro = () => {
  return (
    <Content>
      <Section maxWidth="small">
        <PageHeaderNavigation />
        <BodyText>
          Hello. My name is Jamie. I'm a Creative Developer & Software Engineer
          based in London, UK. I use current web technologies to build apps,
          installations & websites. Keep scrolling to have a peruse! Or Resume /
          CV
        </BodyText>
      </Section>
      <NextBackNavigation />
    </Content>
  );
};

export default Intro;
