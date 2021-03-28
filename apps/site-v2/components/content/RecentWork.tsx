import { FC } from "react";
import { ProjectsContextProvider } from "components/context/ProjectsContext";
import { Content, ProjectImageLinks, Section } from "components/common";
import { Text } from "theme-ui";
import { ProjectData } from "types";

export const RecentWork: FC<{ projects: ProjectData[] }> = ({ projects }) => {
  return (
    <ProjectsContextProvider projects={projects}>
      <Content>
        {/* <Section maxWidth="medium">
          <Text variant="body_text">
            Some recent work made with the very talented folk at agencies{" "}
            <Styled.a href="https://allofus.com/" target="_blank">
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
          </Text>
        </Section> */}
        <Section maxWidth="medium">
          <ProjectImageLinks projects={projects} />
        </Section>
      </Content>
    </ProjectsContextProvider>
  );
};
