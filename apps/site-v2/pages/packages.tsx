import {
  Section,
  BodyText,
  Content,
  PageHeaderNavigation,
  PackagesGrid,
} from "components/common";
import { packagesData } from "data/packages-data";

export const Packages = () => {
  return (
    <Content>
      <Section maxWidth="small">
        <PageHeaderNavigation />
        <BodyText>
          Various npm package examples, on a private repo for now. Will make
          public soon.
        </BodyText>
      </Section>
      <Section maxWidth="medium">
        <PackagesGrid root={packagesData} />
      </Section>
    </Content>
  );
};

export default Packages;
