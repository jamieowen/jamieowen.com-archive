import {
  BodyHeader,
  BodySmallText,
  BodyText,
  Button,
  Content,
  Section,
} from "components/common";
import { NextButton } from "components/common/buttons";

export const Intro = () => {
  return (
    <Content>
      <Section maxWidth="small">
        <BodyHeader>01 / Intro</BodyHeader>
        <BodyText>
          Hello. My name is Jamie. I'm a Creative Developer & Software Engineer
          based in London, UK. I use current web technologies to build apps,
          installations & websites. Keep scrolling to have a peruse! Or Resume /
          CV
        </BodyText>
      </Section>
      <NextButton href="/recent-work">
        Next / <span className="opq3">02. Recent Work</span>
      </NextButton>
    </Content>
  );
};

export default Intro;
