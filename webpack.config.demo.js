const common = require("./webpack.config.js");

const override = {
  output: {
    path: __dirname + "/docs",
    publicPath: "./",
    filename: "bundle.js"
  }
};

module.exports = { ...common, ...override };
