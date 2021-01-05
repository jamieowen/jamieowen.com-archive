export type Image = {
  url: string;
  width: number;
  height: number;
};

/**
 * Data crawled from folder structure
 */
export interface ProjectData {
  id: string;
  url: string;
  images: Image[];
  thumbs: Image[];
  content: ProjectContent;
}

/**
 * Data defined in /services/project-data.ts
 */
export interface ProjectContent {
  order: number;
  baseColor: string | [number, number, number];
  client: string;
  title: string;
}
