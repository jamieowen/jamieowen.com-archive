import { Section, Content, ProjectImages } from "components/common";
import { FC, Fragment } from "react";
import { Container, Grid, Text } from "theme-ui";
import { StaticPropsType } from "services/get-static-paths";
import {
  ProjectsContextProvider,
  useProjects,
} from "components/context/ProjectsContext";
import { useNavigationData } from "./MenuNavigation";
import { RecentWork } from "components/content/RecentWork";
import { Styled } from "theme-ui";

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

const Header: FC<any> = ({ children }) => {
  return (
    <Text
      sx={{
        fontFamily: "heading",
        fontSize: "8px",
        fontWeight: 400,
        lineHeight: "32px",
        opacity: 0.75,
        textTransform: "uppercase",
      }}
    >
      {children}
    </Text>
  );
};

export const ProjectsContent: FC<{}> = ({ children }) => {
  const projects = useProjects();

  const project = projects ? projects.currentProject : null;
  const nextProject = projects ? projects.nextProject : null;

  if (project) {
    return (
      <Fragment>
        <Content>
          <Container variant="divider_header">
            <Text variant="body_text">
              <Styled.a href="/">Back</Styled.a>
            </Text>
          </Container>

          <Section maxWidth="medium">
            <Grid variant="grid_2">
              <Container>
                <Header>Title</Header>
                <Text variant="body_small">{project.content.title}</Text>
              </Container>
              <Container>
                <Header>Client</Header>
                <Text variant="body_small">{project.content.client}</Text>
              </Container>
              <Container>
                <Header>Tech</Header>
                <Text variant="body_small">
                  {project.content.tech && project.content.tech.join(", ")}
                </Text>
              </Container>
              <Container>
                <Header>Agency</Header>
                <Text variant="body_small">{project.content.agency}</Text>
              </Container>
            </Grid>
          </Section>
          <Section>
            <ProjectImages project={projects.currentProject} />
          </Section>
          <Section maxWidth="medium" sx={{ columnCount: 2 }}>
            <Text variant="body_small">{children}</Text>
          </Section>
          <Section>
            <RecentWork projects={projects.projects} />
          </Section>
        </Content>
      </Fragment>
    );
  } else {
    return <Content>{children}</Content>;
  }
};

export default ProjectMDXWrapper;

// {nextProject && (
//   <Section>
//     {/* <BodyHeader>{nextProject.id + " / Next"}</BodyHeader> */}
//     <BodyHeader>
//       <span className="opq5">
//         {navigation.current.num} / Recent Work / Next
//       </span>
//       {/* {nextProject.id} */}
//     </BodyHeader>
//     <BodyLink href={nextProject.url}>
//       {nextProject.content.title + " >> "}
//     </BodyLink>
//   </Section>
// )}
