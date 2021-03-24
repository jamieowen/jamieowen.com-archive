import {
  Section,
  BodyHeader,
  BodyText,
  Content,
  ProjectImages,
} from "components/common";
import { FC, Fragment } from "react";
import { Container, Grid, Text } from "theme-ui";

// export { getStaticPaths, getStaticProps } from "services/get-static-paths";
import { StaticPropsType } from "services/get-static-paths";
import {
  ProjectsContextProvider,
  useProjects,
} from "components/context/ProjectsContext";
import { useNavigationData } from "./MenuNavigation";
import { RecentWork } from "components/content/RecentWork";

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

const Title: FC<any> = ({ children }) => {
  return <Text>{children}</Text>;
};

export const ProjectsContent: FC<{}> = ({ children }) => {
  const projects = useProjects();

  const navigation = useNavigationData();

  console.log(projects);

  const project = projects ? projects.currentProject : null;
  const nextProject = projects ? projects.nextProject : null;

  if (project) {
    return (
      <Fragment>
        <Content>
          <Section maxWidth="medium">
            <BodyHeader>
              <span className="opq5">
                {navigation.current.num} / Recent Work /{" "}
              </span>
              {project.id}
            </BodyHeader>
            {/* <hr /> */}
            <Grid variant="grid_2">
              <Container>
                <Header>Title</Header>
                <Title>{project.content.title}</Title>
              </Container>
              <Container>
                <Header>Client</Header>
                <Title>{project.content.client}</Title>
              </Container>
              <Container>
                <Header>Tech</Header>
                <Title>
                  {project.content.tech && project.content.tech.join(", ")}
                </Title>
              </Container>
              <Container>
                <Header>Agency</Header>
                <Title>{project.content.agency}</Title>
              </Container>
            </Grid>
          </Section>
          <Section>
            <ProjectImages project={projects.currentProject} />
          </Section>
          <Section maxWidth="medium" sx={{ columnCount: 2 }}>
            <BodyText>{children}</BodyText>
          </Section>
          <Section>
            <RecentWork projects={projects.projects} />
          </Section>
        </Content>

        {/* <Footer>
          <FooterNavigation />
          <FooterCopyright />
        </Footer> */}
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
