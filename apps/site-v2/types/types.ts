import { ReactNode } from "react";

export type ProjectImage = {
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
  images: ProjectImage[];
  thumbs: ProjectImage[];
  json: string[];
  content: ProjectContent;
}

/**
 * Data defined in /services/project-data.ts
 */
export interface ProjectContent {
  order: number;
  baseColor: string | [number, number, number];
  client: string;
  tech: string[];
  title: string;
  agency: string;
  content: string;
}
