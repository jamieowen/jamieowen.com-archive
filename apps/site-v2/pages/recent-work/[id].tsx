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

export { getStaticPaths, getStaticProps } from "services/get-static-paths";
import { StaticPropsType } from "services/get-static-paths";

export const ProjectPage: FC<StaticPropsType> = ({ project }) => {
  const p = project as ProjectData;
  return (
    <Content>
      <Section maxWidth="small">
        <BodyHeader>05 / Recent Work</BodyHeader>
        <BodyText>{p.id}</BodyText>
      </Section>
      <Section maxWidth="medium">
        {p.content.content.split("\n").map((t, i) => (
          <BodyText key={i}>{t}</BodyText>
        ))}
      </Section>
      <Section maxWidth="medium">
        <ProjectImages project={project} />
      </Section>
      <Button>Next</Button>
    </Content>
  );
};

export default ProjectPage;
