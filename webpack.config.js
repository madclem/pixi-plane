// webpack.config.js
const path = require("path");
const webpack = require("webpack");

const pathBuild = path.resolve(__dirname, "lib");
const pathNodeModules = path.resolve(__dirname, "node_modules");
const env = process.env.NODE_ENV;

const plugins = [];
plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compress: {
      drop_debugger: true,
      drop_console: true,
      screw_ie8: true,
    },
    comments: false,
    mangle: true,
  })
);

const entry = { app: "./src/js/index.js" };
const output = {
  path: pathBuild,
  filename: "./pixi-plane.js",
  library: "pixi-plane",
  libraryTarget: "umd",
  umdNamedDefine: true,
};

const devtool = "source-map";

const config = {
  entry,
  devtool,
  plugins,
  output,
  externals: {
    "@pixi/core": "@pixi/core",
    "@pixi/mesh": "@pixi/mesh",
    "@pixi/math": "@pixi/math",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env"],
        },
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports = config;
