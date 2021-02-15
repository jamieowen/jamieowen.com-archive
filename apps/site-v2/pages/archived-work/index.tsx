import React, { FC, Fragment } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ContentContainer, PageHeader } from "../../components/common";
import { MediaGrid } from "../../components/media-grid";
import { readArchivedWork } from "../../services";

export const getStaticProps = async () => {
  const projects = readArchivedWork();
  return {
    props: {
      projects,
    },
  };
};

export const ArchivedWork: FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ projects }) => {
  const images = projects.map((p) => {
    const image = p.thumbs[0] || p.images[0];
    return {
      title: p.id,
      ...image,
    };
  });

  return (
    <Fragment>
      <PageHeader>
        {() => {
          return {
            subtitle: "Archived Work",
            title:
              "It's hard to keep track of all the projects i've worked on over the years.",
            short: "A short bit of text",
          };
        }}
      </PageHeader>
      <ContentContainer>
        <MediaGrid media={images} />
      </ContentContainer>
    </Fragment>
  );
};

export default ArchivedWork;
