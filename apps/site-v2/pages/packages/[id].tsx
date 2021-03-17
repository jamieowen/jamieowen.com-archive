import { FC, Fragment } from "react";

import { packagesData } from "data/packages-data";
import { createStaticMethods } from "services/get-packages-static-paths";
const { getStaticPaths, getStaticProps } = createStaticMethods(packagesData);
export { getStaticPaths, getStaticProps };

import { PackageExample } from "types";
import { ContentIFrame } from "components/common";

export const PackageExamples: FC<{ packageExample: PackageExample }> = ({
  packageExample,
}) => {
  return (
    <Fragment>
      <ContentIFrame src={packageExample.iframe} height="100%"></ContentIFrame>
    </Fragment>
  );
};

export default PackageExamples;
