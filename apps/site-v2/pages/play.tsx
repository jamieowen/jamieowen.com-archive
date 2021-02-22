import {
  Section,
  BodyText,
  Content,
  PageHeaderNavigation,
  PackagesGrid,
} from "components/common";
import { packagesData } from "data/packages-data";

export const Play = () => {
  return (
    <Content>
      <Section maxWidth="small">
        <PageHeaderNavigation />
        <BodyText>Various modules used as building blocks</BodyText>
      </Section>
      {/** Sketches */}
      <Section maxWidth="medium">
        <PackagesGrid root={packagesData} />
      </Section>
      {/** Packages */}
      <Section maxWidth="medium">
        <PackagesGrid root={packagesData} />
      </Section>
    </Content>
  );
};

export default Play;
