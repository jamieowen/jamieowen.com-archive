import React, { FC, Fragment, ReactNode } from "react";
import { Container, Grid, Text, Box } from "theme-ui";
import Image from "next/image";
import Link from "next/link";

enum RowHeight {
  Small,
  Medium,
  Large,
}

type ColCount = 1 | 2 | 4;

export type Media = {
  href?: string;
  url: string;
  title: ReactNode;
  width: number;
  height: number;
};
type MediaGridProps = {
  media: Media[];
  rowStyle?: RowStyle[];
  limitHeight?: boolean;
};

export type RowStyle = [
  [fr: string, fr?: string, fr?: string, fr?: string],
  [occ: 0 | 1, occ?: 0 | 1, occ?: 0 | 1, occ?: 0 | 1],
  string | number
];

export const WORK_ROW_STYLE: RowStyle[] = [
  [["1fr", "3fr"], [0, 1], "20rem"],
  [["2fr", "1fr"], [1, 1], "20rem"],
];

export const ARCHIVE_ROW_STYLE: RowStyle[] = [
  [["1fr", "1fr", "1fr", "2fr"], [1, 1, 1, 1], "30rem"],
  [["1fr", "2fr", "1fr", "1fr"], [1, 1, 0, 1], "30rem"],
  [["2fr", "1fr", "1fr", "1fr"], [1, 1, 1, 1], "30rem"],
  [["2fr", "1fr", "2fr", "1fr"], [0, 1, 1, 1], "30rem"],
];

export const PROJECT_ROW_STYLE: RowStyle[] = [
  [["1fr", "3fr"], [0, 1], "20rem"],
  [["2fr", "1fr"], [1, 1], "20rem"],
  [["2fr", "1fr", "1fr"], [1, 1, 0], "20rem"],
];

type MapRfn = {
  mapRow: (
    children: ReactNode[],
    fr: string,
    height: string | number,
    idx: number
  ) => ReactNode;
  mapEmpty: (idx: number) => ReactNode;
  mapCell: (item: Media, height: string | number, idx: number) => ReactNode;
};

const mapRowStyle = (media: Media[], rowStyle: RowStyle[], mapRfn: MapRfn) => {
  const rows = [];
  let style = rowStyle[0];
  let _media = [...media];
  while (_media.length) {
    const fr = style[0];
    const occupied = style[1];
    const height = style[2] || "20rem";
    const children = occupied.reduce((children, occ, idx) => {
      if (_media.length > 0 && occ === 1) {
        children.push(mapRfn.mapCell(_media.shift(), height, idx));
      } else {
        children.push(mapRfn.mapEmpty(idx));
      }
      return children;
    }, []);
    rows.push(mapRfn.mapRow(children, fr.join(" "), height, rows.length));
    style = rowStyle[(rowStyle.indexOf(style) + 1) % rowStyle.length];
  }
  return rows;
};

export const MediaGrid: FC<MediaGridProps> = ({
  media = [],
  rowStyle = WORK_ROW_STYLE,
  limitHeight = true,
}) => {
  const rows = mapRowStyle(media, rowStyle, {
    mapRow: (children: ReactNode[], fr, height, i) => (
      <Grid key={i} variant="media_grid" columns={fr} data-id="media-grid-row">
        {children}
      </Grid>
    ),
    mapEmpty: (i) => <Container key={i} variant="debug__" />,
    mapCell: (item: Media, height, i) => {
      const image = (
        <Image
          onLoad={() => console.log("ON LOAD", height)}
          src={item.url}
          width={item.width}
          height={item.height}
          data-width={item.width}
          data-height={item.height}
          layout="responsive"
          // objectFit="cover"
          // objectFit="cover"
        />
      );
      return (
        <Container key={i} data-id="media-grid-cell">
          <Container
            sx={{
              maxHeight: limitHeight ? height : undefined,
              overflow: "hidden",
            }}
          >
            {item.href ? <Link href={item.href}>{image}</Link> : image}
          </Container>
          <Text variant="mediagrid_title">{item.title}</Text>
        </Container>
      );
    },
  });
  return <Fragment>{rows}</Fragment>;
};
