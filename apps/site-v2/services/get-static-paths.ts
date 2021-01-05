import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ProjectData } from "types";
import { readArchivedWork, readSelectedWork } from "./read-project-files";

interface ProjectProps {
  project: ProjectData;
}

export const getStaticProps = async (context) => {
  const route = context.params["route"];
  const projects = readSelectedWork();
  let archived: ProjectData[] = [];
  let ptype: string;
  let pid: string;
  let project: ProjectData = null;
  if (route && route.length === 1) {
    ptype = route[0];
  } else if (route && route.length === 2) {
    ptype = route[0];
    pid = route[1];
  }
  if (ptype === "archived-work") {
    archived = readArchivedWork();
  }
  if (pid) {
    project = projects.filter((p) => p.id === pid)[0];
  }

  // const project = projects.find((p) => p.id === projectId);
  return {
    props: {
      projects,
      archived,
      project,
    },
  };
};

export type StaticPropsType = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = readSelectedWork();
  const extraPaths = [[""], ["selected-work"], ["archived-work"]].map(
    (route) => ({
      params: {
        route,
      },
    })
  );
  const projectPaths = projects.map((project) => ({
    params: {
      route: ["selected-work", project.id],
    },
  }));
  return {
    fallback: false,
    paths: [...extraPaths, ...projectPaths],
  };
};
