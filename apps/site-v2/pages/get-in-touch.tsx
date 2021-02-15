import {
  Section,
  BodyText,
  Content,
  NextBackNavigation,
  PageHeaderNavigation,
  SocialMediaGridList,
} from "components/common";
import { Styled } from "theme-ui";

export const GetInTouch = () => {
  return (
    <Content>
      <Section maxWidth="small">
        <PageHeaderNavigation />
        <BodyText>
          Not much of a social media type - one of these days i'll do something
          about it. :) For now, the best way to contact me is{" "}
          <Styled.a href="mailto:hello@jamieowen.com">
            hello@jamieowen.com
          </Styled.a>
        </BodyText>
        <BodyText>
          However, here's my current progress so far - so please follow me on
          twitter and give me some motivation.
        </BodyText>
      </Section>
      <Section>
        <SocialMediaGridList />
      </Section>

      <Section>
        <NextBackNavigation />
      </Section>
    </Content>
  );
};

export default GetInTouch;
