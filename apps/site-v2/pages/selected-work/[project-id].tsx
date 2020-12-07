import React, { FC, Fragment } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { ContentContainer, PageHeader } from "../../components/common";
import { MediaGrid, PROJECT_ROW_STYLE } from "../../components/media-grid";
import { ProjectData } from "../../types";
import { readSelectedWork } from "../../services";
import {
  LargeParagraphHeading,
  SmallParagraphHeading,
} from "../../components/common/headings";

export const getStaticProps: GetStaticProps<ProjectProps> = async (context) => {
  const projectId = context.params["project-id"];
  const projects = readSelectedWork();
  const project = projects.find((p) => p.id === projectId);
  return {
    props: {
      project,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = readSelectedWork();
  const paths = projects.map((project) => ({
    params: {
      ["project-id"]: project.id,
    },
  }));

  return {
    fallback: true,
    paths: projects.map((project) => ({
      params: {
        ["project-id"]: project.id,
      },
    })),
  };
};

interface ProjectProps {
  project: ProjectData;
}

export const Project: FC<ProjectProps> = ({ project, ...props }) => {
  const images = project.images.map((image, i) => {
    return {
      title: `0${i + 1}`.slice(-2),
      ...image,
    };
  });
  return (
    <Fragment>
      <ContentContainer swatch="primary" header>
        <LargeParagraphHeading subtitle="Sapient Razorfish" align="left">
          Argos Christmas Gift Guide, Sapient Razorfish
        </LargeParagraphHeading>
        <SmallParagraphHeading subtitle="Overview" align="right">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          ullamcorper quam vitae ipsum pellentesque feugiat. Curabitur lorem
          lectus, imperdiet non congue vel, iaculis sit amet nunc. Integer
          rhoncus elit et dolor hendrerit, sed interdum elit aliquam. Phasellus
          sit amet quam vulputate, euismod leo in, aliquet ante.
        </SmallParagraphHeading>
      </ContentContainer>
      <ContentContainer swatch="secondary">
        <MediaGrid
          media={images}
          rowStyle={PROJECT_ROW_STYLE}
          limitHeight={false}
        />
      </ContentContainer>
    </Fragment>
  );
};

export default Project;
