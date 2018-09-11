const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  watch: true,
  mode: 'development',
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/assets/images', to: 'assets/images' }
    ]),
    new WriteFilePlugin()
  ]
};
