import {
  Section,
  BodyHeader,
  BodySmallText,
  Content,
  ProjectLinks,
  ProjectImageLinks,
  BodyText,
} from "components/common";
import { ProjectsContextProvider } from "components/context/ProjectsContext";

export { getStaticProps } from "services/get-static-paths";

export const RecentWork = ({ project, projects, archived }) => {
  return (
    <ProjectsContextProvider projects={projects}>
      <Content>
        <Section maxWidth="small">
          <BodyHeader>03 / Recent Work</BodyHeader>

          <BodyText>
            I'm lucky to have worked with some talented folk at Moving Brands,
            Goodboy Digital, AllOfUs. On projects for Google,
          </BodyText>
        </Section>
        <Section maxWidth="medium">
          <ProjectImageLinks projects={projects} />
        </Section>
      </Content>
    </ProjectsContextProvider>
  );
};

export default RecentWork;
