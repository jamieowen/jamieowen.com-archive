import {
  Section,
  BodyHeader,
  BodyText,
  Button,
  Content,
} from "components/common";
import { FC } from "react";

export { getStaticPaths, getStaticProps } from "services/get-static-paths";
import { StaticPropsType } from "services/get-static-paths";

export const ProjectPage: FC<StaticPropsType> = ({ project }) => {
  console.log("PROJEC", project);
  return (
    <Content>
      <BodyHeader>05 / Recent Work</BodyHeader>
      <BodyText>{project.id}</BodyText>
      <Button>Next</Button>
    </Content>
  );
};

export default ProjectPage;
