module.exports = {
  plugins: ["@snowpack/plugin-typescript"],
  alias: {
    "@jamieowen/three-toolkit": "../packages/three-toolkit",
    "@jamieowen/xlayout": "./packages/xlayout",
  },
  mount: {
    public: "/",
    src: "/js",
  },
};
