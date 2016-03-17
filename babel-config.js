var env = process.env.NODE_ENV;

var config = {
  "presets": ["react", "es2015", "stage-0"]
}

if (process.env.NODE_ENV === 'development') {
  config.presets.concat('react-hmre');
}

module.exports = config;
