import { FC, Fragment, forwardRef } from "react";
import { PackageDataRoot, PackageExample } from "types";
import { Box, Text, Grid } from "theme-ui";
import Link from "next/link";
import { MediaView } from "./MediaView";

/**
 * Shift order for items.
 * @param i
 * @returns
 */
const order = (i: number) => {
  const r = i % 4;
  const n = r === 1 ? 2 : r === 2 ? 1 : r;
  console.log("IN", i, n);
  return n + i;
};

/**
 * Take the a project's first image and display along with the title as a clickable link
 * @param param0
 */
export const PackageExampleItem: FC<{
  example: PackageExample;
  idx: number;
}> = ({ example, idx, ...props }) => {
  const row = Math.floor(idx / 2);
  console.log("IDX:", idx, ">", row);

  return (
    <Fragment>
      <Text as="h3" variant="body_small" sx={{ order: 1 }}>
        <span>{example.title}</span>
        <br />
        <span className="opq75">{example.description}</span>
      </Text>
      <Link href={example.href}>
        <Box as="article" sx={{ cursor: "pointer", order: 2 }} {...props}>
          <MediaView src={example.video} type="video" />
        </Box>
      </Link>
    </Fragment>
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
      <Grid variant="packages_grid">
        {examples.map((ex, i) => (
          <PackageExampleItem idx={i} key={i} example={ex} />
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
            <Text variant="body_small">{pkg.title}</Text>
            <PackageExampleGrid examples={pkg.examples} />
          </Fragment>
        );
      })}
    </Fragment>
  );
};
