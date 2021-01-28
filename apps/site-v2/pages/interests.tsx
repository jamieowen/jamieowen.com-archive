import {
  Section,
  BodyHeader,
  BodySmallText,
  BodyText,
  Button,
  Content,
} from "components/common";
import { InterestsGridList } from "components/slide-stack/GridList";

export const Interests = () => {
  return (
    <Content>
      <BodyHeader>02 / Tech Stack</BodyHeader>
      <Section as="div" size="sml" nomargin>
        <BodySmallText>
          Some further interests
          <br />
          <br />
        </BodySmallText>
      </Section>
      <Section as="div" size="mid">
        <InterestsGridList />
      </Section>
    </Content>
  );
};

export default Interests;
