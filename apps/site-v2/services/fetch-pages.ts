export type PageItem = {
  category: string;
  path: string;
  url: string;
};
export const fetchPages = async () => {
  const host = "http://localhost:3000/api/routes";
  const pages = await (await fetch(host)).json();
  return pages as PageItem[];
};
