import { defaultIpsum } from "components/helpers/lorumIpsum";
import { TextFormatter } from "components/text-formatter";
import { FC, Fragment, useMemo } from "react";
import { ProjectData } from "types";
import { Container, Link } from "theme-ui";
import NextLink from "next/link";

import {
  useSlideContext,
  SlideContainer,
  SlideContainerProps,
} from "./SlideStack";

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

export const ProjectTextSlide: FC<
  { project?: ProjectData } & SlideContainerProps
> = ({ project, children, ...props }) => {
  const { currentProject, nextProject, previousProject } = useProjects();
  const text = useMemo(() => defaultIpsum().generateParagraphs(3), []);
  return (
    <SlideContainer {...props}>
      <Container
        sx={{
          position: "fixed",
          top: "64px",
          left: "50%",
          // right: "19%",
          // textAlign: "right",
          width: "100%",
          fontSize: "16px",
        }}
      >
        <ProjectLink project={previousProject}>Previous </ProjectLink>
        <ProjectLink project={nextProject}>Next</ProjectLink>
      </Container>
      <TextFormatter size="16px" lineHeight="32px">
        <strong>{project && project.content.title}</strong>
        <p>{project && project.content.client}</p>
        {text}
      </TextFormatter>
    </SlideContainer>
  );
};
