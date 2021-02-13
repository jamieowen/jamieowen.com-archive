import {
  Section,
  BodyHeader,
  BodyText,
  Button,
  Content,
  ProjectImages,
} from "components/common";
import { FC } from "react";

// export { getStaticPaths, getStaticProps } from "services/get-static-paths";
import { StaticPropsType } from "services/get-static-paths";
import {
  ProjectsContextProvider,
  useProjects,
} from "components/context/ProjectsContext";
import { NextBackNavigation, useNavigationData } from "./MenuNavigation";

export const ProjectMDXWrapper: FC<StaticPropsType> = ({
  children,
  projects,
}) => {
  return (
    <ProjectsContextProvider projects={projects}>
      <ProjectsContent>{children}</ProjectsContent>
    </ProjectsContextProvider>
  );
};

export const ProjectsContent: FC<{}> = ({ children }) => {
  const projects = useProjects();

  const navigation = useNavigationData();

  const project = projects ? projects.currentProject : null;

  if (project) {
    return (
      <Content>
        <Section maxWidth="small">
          <BodyHeader>
            <span className="opq5">
              {navigation.current.num} / Recent Work /{" "}
            </span>
            {project.id}
          </BodyHeader>
          <BodyText>{project.content.title}</BodyText>
          <BodyText>{project.content.client}</BodyText>
        </Section>
        <Section>
          <ProjectImages project={projects.currentProject} />
        </Section>
        <Section maxWidth="medium" sx={{ columnCount: 2 }}>
          {children}
        </Section>
        <Section maxWidth="medium">
          <NextBackNavigation />
        </Section>
      </Content>
    );
  } else {
    return <Content>{children}</Content>;
  }
};

export default ProjectMDXWrapper;
