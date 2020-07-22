var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (env) => {
  var isProduction = env === "production";
  var CSSExtract = new ExtractTextPlugin("gitcard.css");
  return {
    entry: ["babel-polyfill", "./src/app.js"],
    output: {
      path: path.join(__dirname, "public"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.js*$/,
          exclude: /node_modules/,
        },
        {
          test: /\.s?css$/,
          use: CSSExtract.extract({
            use: [
              {
                loader: "css-loader",
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true,
                },
              },
            ],
          }),
          // use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    plugins: [CSSExtract],
    devtool: isProduction ? "source-map" : "cheap-module-eval-source-map",
    devServer: {
      contentBase: path.join(__dirname, "public"),
    },
  };
};
