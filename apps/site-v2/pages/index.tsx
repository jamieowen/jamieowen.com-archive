import {
  BodyHeader,
  BodySmallText,
  BodyText,
  Button,
  Content,
} from "components/common";

export const Intro = () => {
  return (
    <Content>
      <BodyHeader>01 / Intro</BodyHeader>
      <BodySmallText>
        Hello. My name is Jamie. I'm a Creative Developer & Software Engineer
        based in London, UK.
        <br />
        <br />I use current web technologies to build apps, installations &
        websites. Keep scrolling to have a peruse! Or Resume / CV
      </BodySmallText>
      <Button>Next</Button>
    </Content>
  );
};

export default Intro;
