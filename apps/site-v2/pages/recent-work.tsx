import {
  Section,
  BodyHeader,
  BodySmallText,
  Content,
  ProjectLinks,
  ProjectImageLinks,
  BodyText,
  NextBackNavigation,
  useNavigationData,
  PageHeaderNavigation,
} from "components/common";
import { ProjectsContextProvider } from "components/context/ProjectsContext";

export { getStaticProps } from "services/get-static-paths";

export const RecentWork = ({ project, projects, archived }) => {
  return (
    <ProjectsContextProvider projects={projects}>
      <Content>
        <Section maxWidth="small">
          <PageHeaderNavigation />
          <BodyText>
            I'm lucky to have worked with some talented folk at Moving Brands,
            Goodboy Digital, AllOfUs. On projects for Google,
          </BodyText>
        </Section>
        <Section maxWidth="medium">
          <ProjectImageLinks projects={projects} />
        </Section>
        <Section>
          <NextBackNavigation />
        </Section>
      </Content>
    </ProjectsContextProvider>
  );
};

export default RecentWork;
