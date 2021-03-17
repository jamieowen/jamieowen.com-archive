import {
  Section,
  BodyText,
  Content,
  PageHeaderNavigation,
  PackagesGrid,
  BodyHeader,
} from "components/common";
import { packagesData } from "data/packages-data";
import { sketchesData } from "data/sketches-data";

export const Play = () => {
  return (
    <Content>
      {/** Sketches */}
      <Section maxWidth="medium">
        <BodyHeader>03 / Play</BodyHeader>
        <PackagesGrid root={sketchesData} />
      </Section>
      {/** Packages */}
      <Section maxWidth="small">
        <BodyHeader>03 / Packages</BodyHeader>
        <BodyText>
          Code libraries currently being worked on. Forming the basis of
          sketches above. Will open source soon.
        </BodyText>
      </Section>
      <Section maxWidth="medium">
        <PackagesGrid root={packagesData} />
      </Section>
    </Content>
  );
};

export default Play;
