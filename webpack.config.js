const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

module.exports = () => {
  const fileEnv = dotenv.config({
    path: path.resolve(__dirname, ".env"),
  }).parsed;

  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    entry: "./src/index.tsx",
    mode: "development",

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js"],
      alias: {
        Components: path.resolve(__dirname, "src/components/"),
        Pages: path.resolve(__dirname, "src/pages"),
        Services: path.resolve(__dirname, "src/services"),
        Store: path.resolve(__dirname, "src/store"),
        Styleguide: path.resolve(__dirname, "src/styleguide"),
        Utils: path.resolve(__dirname, "src/utils"),
      },
    },

    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
            },
          ],
        },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader",
        },
        {
          test: /\.(s?)css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  mode: "local",
                  localIdentName: "[name]__[local]___[hash:base64:5]",
                  context: ".",
                },
                sourceMap: true,
                importLoaders: 1,
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            "file-loader",
            {
              loader: "img-loader",
              options: {
                bypassOnDebug: true,
              },
            },
          ],
        },
        { test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: "file-loader" },
      ],
    },
    output: {
      path: path.resolve("dist"),
      publicPath: "/",
      filename: "bundle.js",
    },
    devServer: {
      contentBase: path.join(__dirname, "public/"),
      port: 3000,
      publicPath: "http://localhost:3000/dist/",
      hot: true,
      host: "0.0.0.0",
      historyApiFallback: true,
    },
    plugins: [new webpack.DefinePlugin(envKeys)],
  };
};
