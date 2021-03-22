import { FC, Fragment, forwardRef } from "react";
import { PackageDataRoot, PackageExample } from "types";
import { Grid } from "./containers";
import { Image, Container, Box } from "theme-ui";
import { BodyText } from "components/common";
import Link from "next/link";
import { MediaView } from "./MediaView";
import { BodyTextLarge } from "./typography";

// export const PackageImageView = forwardRef<
//   HTMLImageElement,
//   {
//     image: string;
//   }
// >(({ image }, ref) => {
//   return <Image ref={ref} src={image}></Image>;
// });

/**
 * Take the a project's first image and display along with the title as a clickable link
 * @param param0
 */
export const PackageImageLink: FC<{ example: PackageExample }> = ({
  example,
  ...props
}) => {
  return (
    <Link href={example.href}>
      <Box as="article" sx={{ cursor: "pointer" }} {...props}>
        <BodyText>{example.title}</BodyText>
        <BodyText className="opq75">{example.description}</BodyText>
        <MediaView src={example.video} type="video" />
      </Box>
    </Link>
  );
};

/**
 * Take an array of packages and render as ProjectImageLinks
 * @param param0
 */
export const PackageExampleGrid: FC<{ examples: PackageExample[] }> = ({
  examples,
}) => {
  return (
    <Box as="section" sx={{ marginBottom: "6rem" }}>
      <Grid>
        {examples.map((ex, i) => (
          <PackageImageLink key={i} example={ex} />
        ))}
      </Grid>
    </Box>
  );
};

export const PackagesGrid: FC<{ root: PackageDataRoot }> = ({ root }) => {
  return (
    <Fragment>
      {root.packages.map((pkg, i) => {
        return (
          <Fragment key={i}>
            <BodyTextLarge>{pkg.title}</BodyTextLarge>
            <PackageExampleGrid examples={pkg.examples} />
          </Fragment>
        );
      })}
    </Fragment>
  );
};
