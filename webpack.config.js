
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    library: 'myLib',
    libraryTarget: 'commonjs2',
    globalObject: 'this',
    filename: 'asyncify.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
