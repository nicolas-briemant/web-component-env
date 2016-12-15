module.exports = {
  "presets": ["react", "es2015", "stage-0"],
  "plugins": [
    "transform-runtime",
    "transform-decorators-legacy",
    "lodash",
    ["import", { libraryName: "antd" }]
  ]
};
