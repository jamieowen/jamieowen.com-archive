import {
  Section,
  BodyHeader,
  BodySmallText,
  Content,
  ProjectLinks,
  ProjectThumbs,
} from "components/common";
import { ProjectsContextProvider } from "components/context/ProjectsContext";

export { getStaticProps } from "services/get-static-paths";

export const RecentWork = ({ project, projects, archived }) => {
  return (
    <Content>
      <ProjectsContextProvider projects={projects}>
        <BodyHeader>03 / Recent Work</BodyHeader>

        <BodySmallText>
          I'm lucky to have worked with some talented folk at Moving Brands,
          Goodboy Digital, AllOfUs. On projects for Google,
        </BodySmallText>

        <ProjectThumbs projects={projects} />
      </ProjectsContextProvider>
    </Content>
  );
};

export default RecentWork;
