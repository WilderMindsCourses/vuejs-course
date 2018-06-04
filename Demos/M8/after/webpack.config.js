/// <binding ProjectOpened='Watch - Development' />
let path = require("path");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: "development",
  entry: "./wwwroot/js/app.js",
  output: {
    filename: "store.js",
    path: path.resolve("./wwwroot/dist")
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.css'],
    alias: {
      "vue$": 'vue/dist/vue.esm.js'
    }
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ['env']
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: "vue-loader"
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: "css-loader"
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};