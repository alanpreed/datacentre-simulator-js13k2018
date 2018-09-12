const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  watch: false,
  mode: 'production',
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/assets/images', to: 'assets/images' },
      { from: 'index.html', to:'' }
    ]),
    new UglifyJsPlugin({
      sourceMap: false,
      test: /\.js($|\?)/i,
      uglifyOptions: {
        ecma: 5,
        ie8: false,
        safari10: false,
        topLevel: true,
        mangle: {reserved: []}
      }
    })
  ]
};
