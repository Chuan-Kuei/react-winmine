const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/lib",
    filename: "react-winmine.min.js",
    library: "ReactWinmine.js",
    libraryTarget: "umd"
  },
  externals: [
    {
      react: {
        root: "React",
        commonjs2: "react",
        amd: "react",
        commonjs: "react"
      }
    },
    {
      "react-dom": {
        root: "ReactDOM",
        commonjs2: "react-dom",
        commonjs: "react-dom",
        amd: "react-dom"
      }
    }
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: "[path]___[name]__[local]___[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: ["@babel/transform-react-jsx", "react-css-modules"]
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|png|svg|jpg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1000, //bytes
            name: "[hash:7].[ext]",
            outputPath: "assets"
          }
        }
      }
    ]
  }
};
