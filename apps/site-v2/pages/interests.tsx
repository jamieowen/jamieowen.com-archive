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
      <Section maxWidth="small">
        <BodyHeader>02 / Tech Stack</BodyHeader>
        <BodyText>
          Some further interests
          <br />
          <br />
        </BodyText>
      </Section>
      <Section maxWidth="medium">
        <InterestsGridList />
      </Section>
    </Content>
  );
};

export default Interests;
