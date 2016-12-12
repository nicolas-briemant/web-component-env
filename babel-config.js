// should in wce client config, but comonImports are considered as boilerplates
// and declaring them is not harmful for performance.
// So, let's save some time for cool developments :-)
const commonImports = [
  { libraryName: "antd" },
  { libraryName: "lodash", "libraryDirectory": "", camel2DashComponentName: false }
];

module.exports = {
  "presets": ["react", "es2015", "stage-0"],
  "plugins": ["transform-runtime", "transform-decorators-legacy", ["import", commonImports]]
};
