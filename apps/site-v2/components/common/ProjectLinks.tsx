import { useProjects } from "components/context/ProjectsContext";
import { FC, Fragment, useRef } from "react";
import { Text } from "theme-ui";
import { Button } from "./Button";

export const ProjectLinks: FC<{}> = () => {
  const { currentProject, projects } = useProjects();
  // const context = useSlideContext();
  //onClick={(ev) => context.launchProject(ev, p)}
  const projectLinks = projects.map((p, i) => {
    const ref = useRef<HTMLAnchorElement>();
    console.log(p.images);
    const element = (
      <Button ref={ref} key={i}>
        <Text as="div" variant="project_text">
          {/* <em style={{ ...em() }}> _00{i + 1}</em> */}
          <strong>{p.content.client}</strong> <span>{p.content.title} </span>
          <strong>({p.content.agency}) </strong>
        </Text>
      </Button>
    );

    return {
      ref,
      element,
      project: p,
    };
  });

  return <Fragment>{projectLinks.map((p) => p.element)}</Fragment>;
};
