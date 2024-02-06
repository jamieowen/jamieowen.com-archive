import { FC, Fragment, forwardRef } from "react";
import { PackageDataRoot, PackageExample } from "types";
import { Box, Text, Grid } from "theme-ui";
import Link from "next/link";
import { MediaView } from "./MediaView";

const calcRowCol = (i: number) => {
  let row = Math.floor(i / 2) + 1;
  let col = (i % 2) + 1;
  if (row % 2 === 1 && col === 2) {
    col = 1;
    row = row + 1;
  } else if (row % 2 === 0 && col === 1) {
    col = 2;
    row = row - 1;
  }
  return [row, col];
};
/**
 * Take the a project's first image and display along with the title as a clickable link
 * @param param0
 */
export const PackageExampleItem: FC<{
  example: PackageExample;
  idx: number;
}> = ({ example, idx, ...props }) => {
  const i1 = idx * 2;
  const i2 = idx * 2 + 1;
  const [row1, col1] = calcRowCol(i1);
  const [row2, col2] = calcRowCol(i2);
  return (
    <Fragment>
      <Text
        as="h3"
        variant="body_small"
        sx={{ gridRow: [undefined, row1], gridColumn: [undefined, col1] }}
      >
        <strong>{example.title}</strong>
        <br />
        <span className="opq75">{example.description}</span>
      </Text>
      <Link href={example.href}>
        <Box
          as="article"
          sx={{
            cursor: "pointer",
            gridRow: [undefined, row2],
            gridColumn: [undefined, col2],
          }}
          {...props}
        >
          <MediaView src={example.image} type="image" />
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
            <Text variant="body_small">
              <strong>{pkg.title}</strong>
            </Text>
            <PackageExampleGrid examples={pkg.examples} />
          </Fragment>
        );
      })}
    </Fragment>
  );
};
