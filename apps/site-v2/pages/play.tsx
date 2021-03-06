import {
  Section,
  BodyText,
  Content,
  PageHeaderNavigation,
  PackagesGrid,
} from "components/common";
import { packagesData } from "data/packages-data";
import { sketchesData } from "data/sketches-data";

export const Play = () => {
  return (
    <Content>
      <Section maxWidth="small">
        <PageHeaderNavigation />
      </Section>
      {/** Sketches */}
      <Section maxWidth="medium">
        <PackagesGrid root={sketchesData} />
      </Section>
      {/** Packages */}
      <Section>
        <hr />
        <BodyText>Some recent building blocks </BodyText>
      </Section>
      <Section maxWidth="medium">
        <PackagesGrid root={packagesData} />
      </Section>
    </Content>
  );
};

export default Play;
