const path = require("path");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

const withTM = require("next-transpile-modules")([
  path.resolve("../../packages/three-toolkit/src"),
  path.resolve("../../packages/three-toolkit/src/color"),
  path.resolve("../../packages/motion-layout/src"),
  path.resolve("../../packages/xlayout/src"),
]);

module.exports = withTM(
  withMDX({
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  })
);
