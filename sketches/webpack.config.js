const glob = require("glob");
const pathUtil = require("path");
const { ESBuildPlugin } = require("esbuild-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const collectEntries = () => {
  return glob.sync("src/*.ts", { cwd: __dirname }).reduce((entries, path) => {
    const name = pathUtil.basename(path).replace(".ts", "");
    entries[name] = pathUtil.resolve(path);
    return entries;
  }, {});
};

const entries = collectEntries();
const htmlEntryPlugins = Object.entries(entries).map(([key, value]) => {
  return new HtmlWebpackPlugin({
    title: key,
    filename: `${key}.html`,
    chunks: [key],
  });
});

console.log(entries);

const webpackConfig = {
  mode: "development",
  entry: entries,
  output: {
    filename: "[name].bundle.js",
    path: pathUtil.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@jamieowen/three-toolkit": pathUtil.resolve(
        "../packages/three-toolkit/src"
      ),
      // "@jamieowen/xlayout": ["./packages/xlayout/src"]
    },
  },
  module: {
    rules: [
      // {
      //   test: /\.tsx?$/,
      //   use: "ts-loader",
      //   exclude: /node_modules/,
      // },
      {
        test: /\.tsx?$/,
        loader: "esbuild-loader",
        options: {
          loader: "tsx", // Or 'ts' if you don't need tsx
          target: "es2015",
          tsconfigRaw: require("./tsconfig.json"),
        },
      },
    ],
  },
  devServer: {
    contentBase: pathUtil.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({}),
    ...htmlEntryPlugins,
    new ESBuildPlugin(),
  ],
};

module.exports = webpackConfig;
