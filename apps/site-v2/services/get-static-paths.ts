import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { ProjectData } from "types";
import { readArchivedWork, readSelectedWork } from "./read-project-files";

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  // Determine route project.
  let id = null;
  if (context.params) {
    id = context.params["id"];
  }
  const projects = readSelectedWork();
  let project: ProjectData = null;
  if (id) {
    project = projects.find((p) => p.id === id);
  }

  return {
    props: {
      archived: [] as ProjectData[],
      project,
      projects,
    },
  };
};
export type StaticPropsType = InferGetStaticPropsType<typeof getStaticProps>;

export const _getStaticProps = async (context) => {
  const route = context.params ? context.params["id"] : null;
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

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = readSelectedWork();
  return {
    fallback: false,
    paths: projects.map((p) => {
      return {
        params: {
          id: p.id,
        },
      };
    }),
  };
};

export const _getStaticPaths: GetStaticPaths = async () => {
  const projects = readSelectedWork();
  const extraPaths = [[""], ["selected-work"], ["archived-work"]].map(
    (route) => ({
      params: {
        id: route,
      },
    })
  );
  const projectPaths = projects.map((project) => ({
    params: {
      id: ["recent-work", project.id],
    },
  }));
  return {
    fallback: false,
    paths: [...extraPaths, ...projectPaths],
  };
};
