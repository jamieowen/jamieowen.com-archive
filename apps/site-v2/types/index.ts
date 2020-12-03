export type Image = {
  url: string;
  width: number;
  height: number;
};
export interface ProjectData {
  id: string;
  url: string;
  images: Image[];
  thumbs: Image[];
  content: any;
}
