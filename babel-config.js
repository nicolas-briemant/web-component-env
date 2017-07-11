module.exports = {
  "presets": ["react", "es2015", "stage-0"],
  "plugins": [
    "transform-runtime",
    "transform-decorators-legacy",
    "lodash",
    "dynamic-import-node",
    ["import", { libraryName: "antd" }]
  ]
};
