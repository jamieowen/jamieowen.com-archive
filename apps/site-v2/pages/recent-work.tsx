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
            Some recent work made possible whilst contracting with the very
            talented folk at agencies:{" "}
            <a href="https://allofus.com/" target="_blank">
              AllOfUs
            </a>
            ,{" "}
            <a href="https://www.goodboydigital.com/" target="_blank">
              Goodboy Digital
            </a>
            ,{" "}
            <a href="https://www.movingbrands.com/" target="_blank">
              Moving Brands
            </a>
            ,{" "}
            <a href="https://www.rehabagency.ai/" target="_blank">
              Rehab Agency
            </a>
            , and{" "}
            <a href="https://nexusstudios.com/interactive/" target="_blank">
              Nexus Studios.
            </a>
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
