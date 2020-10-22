import { NextApiRequest, NextApiResponse } from "next";
import glob from "glob";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const pages = glob
    .sync("**/*.{tsx,mdx}", { cwd: "./pages" })
    .filter((path) => {
      return path.indexOf("_") === -1;
    })
    .map((path) => {
      const seg = path.split("/");
      const cat = seg.length === 1 ? "root" : seg[0];
      const url = path.replace(/(index)*\.(mdx|tsx)$/g, "");
      return {
        category: cat,
        path: path,
        url: `/${url}`,
      };
    });

  res.statusCode = 200;
  res.json({ pages });
};
