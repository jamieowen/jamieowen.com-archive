function importAll(r: any) {
  return r.keys().map((fileName: String) => ({
    link: fileName.substr(1).replace(/\/index\.mdx$/, ""),
    module: r(fileName),
  }));
}

export const writing = importAll(
  require.context("../pages/writing/", true, /\.mdx$/)
);
