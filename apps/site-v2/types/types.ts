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

/**
 * Package data is used as both play / packages section.
 */
export interface PackageDataRoot {
  packages: PackageInfo[];
}

export interface PackageInfo {
  href?: string; // a link ( not requiest )
  title: string;
  examples: PackageExample[];
}

export interface PackageExample {
  id: string;
  description: string;
  title: string;
  href: string; // local relative path
  iframe: string; // iframe content path
  image: string; // video thumbnail path
  video: string; // video path
  visible?: boolean;
  code?: string; // ref to code example.
}
