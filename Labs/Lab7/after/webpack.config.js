// webpack.config.js
let path = require("path");

module.exports = {
  entry: "./wwwroot/js/app.js",
  mode: 'development',
  output: {
    filename: 'vueapp.js',
    path: path.resolve(__dirname, './wwwroot/dist')
  },
  resolve: {
    alias: {
      "vue$": 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ['env']
        }
      }
    ]
  }
}