var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path : __dirname + '/build',
    publicPath: '/assets/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        },
        exclude: /node_modules/
      },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.html$/, loader: "raw" }
    ]
  },
  resolve: {
    modulesDirectories: ["node_modules", "bower_components"]
  },
  resolveLoader: {
    root: path.resolve(__dirname, 'node_modules')
  },
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
    )
  ],
  devServer: {
    publicPath: "/",
    contentBase: "./src"
  }
};