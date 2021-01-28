import { FC, Fragment, useRef } from "react";
import { ProjectData } from "types";
import { Grid } from "./containers";
import { Image, Container, Label } from "theme-ui";
import { BodySmallText } from "components/common";
import Link from "next/link";

export const ProjectThumb: FC<{ project: ProjectData }> = ({ project }) => {
  const image = project.images[0];

  return (
    <Container>
      <BodySmallText>{project.content.title}</BodySmallText>
      <Link href={project.url}>
        <Image src={image.url}></Image>
      </Link>
    </Container>
  );
};

export const ProjectThumbs: FC<{ projects: ProjectData[] }> = ({
  projects,
}) => {
  return (
    <Grid>
      {projects.map((p, i) => (
        <ProjectThumb key={i} project={p} />
      ))}
    </Grid>
  );
};
