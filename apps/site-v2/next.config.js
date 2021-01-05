const path = require("path");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

const withTM = require("next-transpile-modules")(
  [
    // Keep the layout modules within here. To allow direct transpilation ( ie. not from the generated js )
    path.resolve("./node_modules/@jamieowen/layout/src"),
    path.resolve("./node_modules/@jamieowen/motion/src"),
    path.resolve("./node_modules/@jamieowen/browser/src"),

    // TO MOVE..
    // path.resolve("../../packages/three-toolkit/src"),
    path.resolve("../../packages/three-toolkit/src/color"),
    // path.resolve("../../../packages/packages/layout/src"),
    path.resolve("../../packages/motion-layout/src"),
    path.resolve("../../packages/xlayout/src"),
  ],
  {
    debug: true,
    // resolveSymlinks: true,
    // unstable_webpack5: true,
  }
);

module.exports = withTM(
  withMDX({
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  })
);
