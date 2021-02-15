module.exports = {
  plugins: ["@snowpack/plugin-typescript"],
  alias: {
    // "@jamieowen/color": "./node_modules/@jamieowen/color/src",
  },
  mount: {
    public: "/",
    src: "/js",
  },
};
