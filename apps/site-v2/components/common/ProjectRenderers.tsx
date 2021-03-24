import { FC } from "react";
import { ProjectData } from "types";
import { Box, Text, Grid } from "theme-ui";
import Link from "next/link";
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
      <Box sx={{ cursor: "pointer" }} {...props}>
        <Text as="p" variant="body_small">
          <strong>{project.content.client} /</strong>
          <br />
          <span className="opq5"> {project.content.title}</span>
        </Text>
        <MediaView type="image" src={project.images[0].url} />
      </Box>
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
    <Grid variant="grid_2">
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
    <Grid variant="grid_2">
      {project.images.map((image, i) => (
        <MediaView key={i} type="image" src={image.url} />
      ))}
    </Grid>
  );
};
