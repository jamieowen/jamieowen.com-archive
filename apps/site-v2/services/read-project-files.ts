import glob from "glob";
import pathUtil from "path";
import imageSize from "image-size";
import { ProjectContent, ProjectData } from "../types";
import { data } from "../data/project-data";

/**
 * Read a project folder.
 * Used for selected and archived work.
 * See /public/data/selected-work for rough structure.
 * @param path
 */
export const readProjectFiles = (
  basePath: string,
  baseUrl: string
): ProjectData[] => {
  return glob
    .sync("*", { cwd: basePath })
    .filter((path) => {
      return path.indexOf("_") === -1;
    })
    .map((path) => {
      const files = glob.sync(`*.{jpg,png,json}`, {
        cwd: pathUtil.join(basePath, path),
      });

      const fullPath = (file: string) => `/assets/${baseUrl}/${path}/${file}`;
      // Images
      // Thumbs is a bit outdated. From previous version. FFS.
      const { images, thumbs } = files
        .filter((f) => f.indexOf(".json") === -1)
        .reduce(
          (cat, file) => {
            const url = fullPath(file);
            const size = imageSize(pathUtil.join(basePath, path, file));
            if (file.indexOf("thumb") > -1) {
              cat.thumbs.push({
                ...size,
                url,
              });
            } else {
              cat.images.push({
                ...size,
                url,
              });
            }
            return cat;
          },
          { images: [], thumbs: [] }
        );

      // JSON
      const json = files.filter((f) => f.indexOf(".json") > -1).map(fullPath);

      const content: ProjectContent = data[path]
        ? data[path]
        : {
            baseColor: "black",
            client: "Missing",
            title: "Missing",
          };

      return {
        id: path,
        url: `/work/${path}`,
        images,
        thumbs,
        content,
        json,
      };
    })
    .sort((a, b) => {
      return a.content.order - b.content.order;
    });
};

export const readSelectedWork = () => {
  return readProjectFiles("./public/assets/projects", "projects");
};

export const readArchivedWork = () => {
  // Archived work coming from sprite sheets folder...
  return readProjectFiles("./public/assets/spritesheets", "spritesheets");
  // return readProjectFiles("./public/data/archived-work", "archived-work");
};
