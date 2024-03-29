const path = require("path");
const withVideos = require("next-videos");
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

const withTM = require("next-transpile-modules")(
  [
    // Keep the layout modules within here. To allow direct transpilation ( ie. not from the generated js )
    path.resolve("./node_modules/@jamieowen/layout/src"),
    path.resolve("./node_modules/@jamieowen/motion/src"),
    path.resolve("./node_modules/@jamieowen/browser/src"),
    path.resolve("./node_modules/@jamieowen/color/src"),
    path.resolve("./node_modules/@jamieowen/three/src"),

    // TO MOVE..
    // path.resolve("../../packages/three-toolkit/src"),
    // path.resolve("../../packages/three-toolkit/src/color"),
    // path.resolve("../../../packages/packages/layout/src"),
    // path.resolve("../../packages/motion-layout/src"),
    // path.resolve("../../packages/xlayout/src"),
  ],
  {
    debug: true,
    // resolveSymlinks: true,
    // unstable_webpack5: true,
  }
);

module.exports = withTM(
  withVideos(
    withMDX({
      pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
      distDir: "build",
      output: "export",
      // async redirects() {
      //   return [{ source: "/", destination: "/work", permanent: true }];
      // },
    })
  )
);
