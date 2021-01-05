import glob from "glob";
import pathUtil from "path";
import imageSize from "image-size";
import { ProjectContent, ProjectData } from "../types";
import { data } from "./project-data";

/**
 * Read a project folder.
 * Used for selected and archived work.
 * See /public/data/selected-work for rough structure.
 * @param path
 */
export const readProjectFiles = (
  basePath: string = "./public/data/selected-work",
  baseUrl: string = "selected-work"
): ProjectData[] => {
  return glob
    .sync("*", { cwd: basePath })
    .filter((path) => {
      return path.indexOf("_") === -1;
    })
    .map((path) => {
      const files = glob.sync(`*.{jpg,png}`, {
        cwd: pathUtil.join(basePath, path),
      });
      const { images, thumbs } = files.reduce(
        (cat, file) => {
          const url = `/data/${baseUrl}/${path}/${file}`;
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

      const content: ProjectContent = data[path]
        ? data[path]
        : {
            baseColor: "black",
            client: "Missing",
            title: "Missing",
          };

      return {
        id: path,
        url: `/${baseUrl}/${path}`,
        images,
        thumbs,
        content,
      };
    })
    .sort((a, b) => {
      return a.content.order - b.content.order;
    });
};

export const readSelectedWork = () => {
  return readProjectFiles("./public/data/selected-work", "selected-work");
};

export const readArchivedWork = () => {
  return readProjectFiles("./public/data/archived-work", "archived-work");
};
