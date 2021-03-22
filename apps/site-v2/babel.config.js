module.exports = {
  presets: [["next/babel", { "class-properties": { loose: true } }]],
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    [
      "babel-plugin-styled-components",
      {
        ssr: true,
        displayName: true,
        preprocess: false,
      },
    ],
  ],
};
