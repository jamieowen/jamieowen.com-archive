import { useRouter } from "next/router";
import { createContext, FC, useContext, useMemo } from "react";
import { ProjectData } from "types";

interface IProjectsContext {
  projects: ProjectData[];
  currentProject: ProjectData | null;
  nextProject: ProjectData | null;
  previousProject: ProjectData | null;
}

const getNextPrevious = (current: ProjectData, projects: ProjectData[]) => {
  if (!current) {
    return {
      nextProject: null,
      previousProject: null,
    };
  } else {
    const idx = projects.indexOf(current);
    return {
      nextProject: idx >= projects.length - 1 ? null : projects[idx + 1],
      previousProject: idx <= 0 ? null : projects[idx - 1],
    };
  }
};

const ProjectsContext = createContext<IProjectsContext>(null!);
export const useProjects = () => useContext(ProjectsContext);

export const ProjectsContextProvider: FC<{ projects: ProjectData[] }> = ({
  projects,
  children,
}) => {
  const router = useRouter();
  const contextValue = useMemo<IProjectsContext>(() => {
    const match = projects.filter((p) => p.url === router.asPath);
    const currentProject = match.length > 0 ? match[0] : null;
    const nextPrev = getNextPrevious(currentProject, projects);
    return {
      projects,
      currentProject,
      ...nextPrev,
    };
  }, [projects, router.asPath]);

  return (
    <ProjectsContext.Provider value={contextValue}>
      {children}
    </ProjectsContext.Provider>
  );
};
