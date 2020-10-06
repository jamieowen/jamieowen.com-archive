const path = require("path");
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});
const withTM = require("next-transpile-modules")([
  path.resolve("../../packages/three-toolkit/src"),
]);
module.exports = withTM();
// module.exports = withMDX({
//   pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
// });
