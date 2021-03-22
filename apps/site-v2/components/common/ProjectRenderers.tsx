import { FC } from "react";
import { ProjectData } from "types";
import { Grid } from "./containers";
import { Container } from "theme-ui";
import Link from "next/link";
import { BodyText, BodyTextLarge } from "./typography";
import { MediaView } from "./MediaView";

/**
 * Take the a project's first image and display along with the title as a clickable link
 * @param param0
 */
export const ProjectImageLink: FC<{ project: ProjectData }> = ({
  project,
  ...props
}) => {
  return (
    <Link href={project.url}>
      <Container sx={{ cursor: "pointer" }} {...props}>
        <BodyText>
          <strong>{project.content.client} /</strong>
          <br />
          <span className="opq5"> {project.content.title}</span>
        </BodyText>
        <MediaView type="image" src={project.images[0].url} />
      </Container>
    </Link>
  );
};

/**
 * Take an array of projects and render as ProjectImageLinks
 * @param param0
 */
export const ProjectImageLinks: FC<{ projects: ProjectData[] }> = ({
  projects,
}) => {
  return (
    <Grid>
      {projects.map((p, i) => (
        <ProjectImageLink key={i} project={p} />
      ))}
    </Grid>
  );
};

/**
 * Take a project and render its only.
 * @param param0
 */
export const ProjectImages: FC<{ project: ProjectData }> = ({ project }) => {
  return (
    <Grid>
      {project.images.map((image, i) => (
        <MediaView key={i} type="image" src={image.url} />
      ))}
    </Grid>
  );
};
