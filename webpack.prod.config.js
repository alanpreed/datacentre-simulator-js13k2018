const CopyWebpackPlugin = require('copy-webpack-plugin');

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
    ])
  ]
};
