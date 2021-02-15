import { FC, Fragment, useRef, forwardRef } from "react";
import { ProjectData, ProjectImage } from "types";
import { Grid } from "./containers";
import { Image, Container } from "theme-ui";
import { BodyText } from "components/common";
import Link from "next/link";

export const ProjectImageView = forwardRef<
  HTMLImageElement,
  {
    image: ProjectImage;
  }
>(({ image }, ref) => {
  return <Image ref={ref} src={image.url}></Image>;
});

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
        <ProjectImageView image={project.images[0]} />
        <BodyText>
          <strong>{project.content.client}</strong>
          <span className="opq5"> {project.content.title}</span>
        </BodyText>
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
        <ProjectImageView key={i} image={image} />
      ))}
    </Grid>
  );
};
