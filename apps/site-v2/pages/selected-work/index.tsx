import React, { FC, Fragment, useMemo } from "react";
import { GetStaticProps } from "next";
import { ContentContainer } from "../../components/common";
import {
  MediaGrid,
  Media,
  RowStyle,
  ARCHIVE_ROW_STYLE,
  WORK_ROW_STYLE,
} from "../../components/media-grid";
import { ProjectData } from "../../types";
import { readArchivedWork, readSelectedWork } from "../../services";
import {
  LargeParagraphHeading,
  SmallParagraphHeading,
} from "../../components/common/headings";

export const getStaticProps: GetStaticProps<SelectedWorkProps> = async () => {
  const projects = readSelectedWork();
  const archived = readArchivedWork();

  return {
    props: {
      projects,
      archived,
    },
  };
};

interface SelectedWorkProps {
  projects: ProjectData[];
  archived: ProjectData[];
}

export const SelectedWork: FC<SelectedWorkProps> = ({
  projects,
  archived,
  ...props
}) => {
  const projectsMedia = useMemo(
    () =>
      projects.map((p) => {
        const image = p.thumbs[0] || p.images[0];
        return {
          title: (
            <Fragment>
              {p.id} <b>Test</b>
            </Fragment>
          ),
          ...image,
          href: p.url,
        };
      }),
    [projects.length]
  );

  // const archivedMedia = useMemo(
  //   () =>
  //     archived.map((p) => {
  //       const image = p.thumbs[0] || p.images[0];
  //       return {
  //         title: p.id,
  //         ...image,
  //       };
  //     }),
  //   [archived.length]
  // );

  const archivedRows = useMemo(
    () =>
      archived.reduce(
        ({ rowStyle, media }, p) => {
          const maxImage = 5; //Math.random() * 3 + 2;
          const len = Math.min(p.images.length, maxImage);
          // Take a few of the images and only give the first item a title
          for (let i = 0; i < len; i++) {
            media.push({
              ...p.images[i],
              title: i === 0 ? p.id : `0${i + 1}`.slice(-2),
            });
          }
          return { rowStyle, media };
        },
        {
          rowStyle: [] as RowStyle[],
          media: [] as Media[],
        }
      ),
    [archived.length]
  );

  return (
    <Fragment>
      <ContentContainer swatch="secondary" header>
        <LargeParagraphHeading subtitle="Selected Work" align="left">
          Various bits of work from installations, mobile & web apps.
        </LargeParagraphHeading>
        <SmallParagraphHeading subtitle="Overview" align="right">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          ullamcorper quam vitae ipsum pellentesque feugiat. Curabitur lorem
          lectus, imperdiet non congue vel, iaculis sit amet nunc. Integer
          rhoncus elit et dolor hendrerit, sed interdum elit aliquam. Phasellus
          sit amet quam vulputate, euismod leo in, aliquet ante. Pellentesque eu
          porta dui, eu laoreet massa. Donec vel mi diam. Ut vel sapien in ipsum
          tincidunt porttitor.
        </SmallParagraphHeading>
      </ContentContainer>
      <ContentContainer swatch="primary">
        <LargeParagraphHeading subtitle="images" align="left">
          Most recent pieces
        </LargeParagraphHeading>
        <MediaGrid media={projectsMedia} />
      </ContentContainer>
      <ContentContainer swatch="secondary">
        <LargeParagraphHeading subtitle="images" align="left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </LargeParagraphHeading>
        <SmallParagraphHeading subtitle="Archive" align="right">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          ullamcorper quam vitae ipsum pellentesque feugiat. Curabitur lorem
          lectus, imperdiet non congue vel, iaculis sit amet nunc. Integer
          rhoncus elit et dolor hendrerit, sed interdum elit aliquam.
        </SmallParagraphHeading>
        <MediaGrid media={archivedRows.media} rowStyle={ARCHIVE_ROW_STYLE} />
      </ContentContainer>
    </Fragment>
  );
};

export default SelectedWork;

// <PageHeader>
//   {() => {
//     return {
//       subtitle: "Selected Work",
//       title: "Some work from recent times.",
//       short: "A short bit of text",
//     };
//   }}
// </PageHeader>
