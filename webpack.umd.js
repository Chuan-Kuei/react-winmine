const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "react-winmine.css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: "[name]_[local]"
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [
                "@babel/transform-react-jsx",
                [
                  "react-css-modules",
                  {
                    generateScopedName: "[name]_[local]"
                  }
                ]
              ]
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
