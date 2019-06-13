const common = require("./webpack.umd.js");

const override = {
  output: {
    path: __dirname + "/docs",
    publicPath: "./",
    filename: "bundle.js"
  },
  devtool: "source-map"
};

module.exports = { ...common, ...override };
