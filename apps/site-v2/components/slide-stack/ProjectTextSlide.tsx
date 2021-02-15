import { defaultIpsum } from "components/helpers/lorumIpsum";
import { FC, Fragment, useMemo } from "react";
import { ProjectData } from "types";
import { Link, Text, Grid } from "theme-ui";
import NextLink from "next/link";

import {
  useSlideContext,
  SlideContainer,
  SlideContainerProps,
} from "./SlideStack";

import { BodyHeader, BodySmallText, Section } from "components/common";

import { useProjects } from "components/context/ProjectsContext";

export const ProjectLink: FC<{ project: ProjectData | null }> = ({
  project,
  children,
}) => {
  return (
    <Fragment>
      {project ? (
        <NextLink href={project.url}>
          <Link>{children}</Link>
        </NextLink>
      ) : (
        <Link>{children}</Link>
      )}
    </Fragment>
  );
};

export const ProjectInfoText: FC<{}> = ({ children }) => {
  return <Text variant="project_info">{children}</Text>;
};

export const ProjectTextSlide: FC<
  { project?: ProjectData } & SlideContainerProps
> = ({ project, children, ...props }) => {
  // const { currentProject, nextProject, previousProject } = useProjects();
  // const text = useMemo(() => defaultIpsum().generateParagraphs(1), []);
  return (
    <SlideContainer {...props}>
      {/* <ProjectLink project={previousProject}>Previous </ProjectLink>
      <ProjectLink project={nextProject}>Next</ProjectLink> */}
      {/* <Section as="header" size="mid" nomargin>
        <Grid variant="project_info">
          <ProjectInfoText>
            <h3>Client:</h3>
            <span>{currentProject ? currentProject.content.client : ""}</span>
          </ProjectInfoText>
          <ProjectInfoText>
            <h3>Title:</h3>
            <span>{currentProject ? currentProject.content.title : ""}</span>
          </ProjectInfoText>
          <ProjectInfoText>
            <h3>Agency:</h3>
            <span>{currentProject ? currentProject.content.agency : ""}</span>
          </ProjectInfoText>
          <ProjectInfoText>
            <h3>Tech:</h3>
            <span>{currentProject ? currentProject.content.agency : ""}</span>
          </ProjectInfoText>
        </Grid>
      </Section> */}
      <br />
      <br />
      {/* <Section size="mid">
        <BodySmallText>{text}</BodySmallText>
      </Section> */}

      {/* <TextFormatter size="16px" lineHeight="32px">
        <strong>{project && project.content.title}</strong>
        <p>{project && project.content.client}</p>
        {text}
      </TextFormatter> */}
    </SlideContainer>
  );
};
