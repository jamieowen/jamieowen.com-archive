import { FC, Fragment } from "react";
export {
  getStaticPaths,
  getStaticProps,
} from "services/get-packages-static-paths";
import { Container } from "theme-ui";
import { PackageExample } from "types";

export const PackageExamples: FC<{ packageExample: PackageExample }> = ({
  packageExample,
}) => {
  return (
    <Container
      sx={{
        width: "100%",
        height: "100%",
        ".example-iframe": {
          border: "none",
          backgroundColor: "white",
        },
      }}
    >
      <iframe
        className="example-iframe"
        width="100%"
        height="100%"
        src={packageExample.href}
      />
    </Container>
  );
};

export default PackageExamples;
