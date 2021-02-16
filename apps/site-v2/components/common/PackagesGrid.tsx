import { FC, Fragment, useRef, forwardRef } from "react";
import {
  PackageDataRoot,
  PackageExample,
  ProjectData,
  ProjectImage,
} from "types";
import { Grid } from "./containers";
import { Image, Container } from "theme-ui";
import { BodyText } from "components/common";
import Link from "next/link";

export const PackageImageView = forwardRef<
  HTMLImageElement,
  {
    image: string;
  }
>(({ image }, ref) => {
  return <Image ref={ref} src={image}></Image>;
});

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
      <Container sx={{ cursor: "pointer" }} {...props}>
        <PackageImageView image={example.image} />
        <BodyText>{example.title}</BodyText>
        <BodyText>{example.description}</BodyText>
      </Container>
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
    <Grid>
      {examples.map((ex, i) => (
        <PackageImageLink key={i} example={ex} />
      ))}
    </Grid>
  );
};

export const PackagesGrid: FC<{ root: PackageDataRoot }> = ({ root }) => {
  return (
    <Fragment>
      {root.packages.map((pkg, i) => {
        return (
          <Fragment key={i}>
            <BodyText>{pkg.title}</BodyText>
            <PackageExampleGrid examples={pkg.examples} />
          </Fragment>
        );
      })}
    </Fragment>
  );
};
