import {
  Section,
  BodyHeader,
  BodyText,
  Button,
  Content,
  ProjectImages,
} from "components/common";
import { ProjectData } from "types";
import { FC } from "react";

// export { getStaticPaths, getStaticProps } from "services/get-static-paths";
import { StaticPropsType } from "services/get-static-paths";
import {
  ProjectsContextProvider,
  useProjects,
} from "components/context/ProjectsContext";
import { NextBackNavigation } from "./MenuNavigation";

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
  console.log(projects);
  return (
    <Content>
      <Section maxWidth="small">
        <BodyHeader>05 / Recent Work</BodyHeader>
        {/* <BodyText>{project.id}</BodyText> */}
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
};

export default ProjectMDXWrapper;
