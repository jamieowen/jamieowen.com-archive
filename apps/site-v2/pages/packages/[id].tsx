import { FC, Fragment, useState } from "react";

import { packagesData } from "data/packages-data";
import { createStaticMethods } from "services/get-packages-static-paths";
const { getStaticPaths, getStaticProps } = createStaticMethods(packagesData);
export { getStaticPaths, getStaticProps };

import { PackageExample } from "types";
import { BodyText, ContentIFrame } from "components/common";
import { Styled, Container } from "theme-ui";

export const PackageExamples: FC<{ packageExample: PackageExample }> = ({
  packageExample,
}) => {
  const [loaded, setLoaded] = useState(false);
  const onLoaded = () => {
    setLoaded(true);
  };
  return (
    <Fragment>
      <Container
        sx={{
          position: "absolute",
          margin: "2rem",
          zIndex: 1000,
        }}
      >
        <BodyText>
          {loaded ? (
            <Styled.a href="/">Back</Styled.a>
          ) : (
            <span>Loading...</span>
          )}
        </BodyText>
      </Container>
      <ContentIFrame
        src={packageExample.iframe}
        height="100%"
        onLoaded={onLoaded}
      ></ContentIFrame>
    </Fragment>
  );
};

export default PackageExamples;
