'use strict';

const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const version = require('./package.json').version;

const prod = process.env.NODE_ENV === 'production';

// eslint-disable-next-line max-len
const filename = `dbots${process.env.VERSIONED ? `.${version}` : ''}${prod ? '.min' : ''}.js`;

module.exports = {
  entry: './src/index.js',
  mode: prod ? 'production' : 'development',
  devtool: 'source-map',
  output: {
    path: path.resolve('./webpack'),
    filename,
    library: 'dbots',
    libraryTarget: 'umd',
    sourceMapFilename: `./${filename}.map`,
  },
  module: {
    rules: [
      { test: /\.md$/, loader: 'ignore-loader' },
      {
        test: /^package\.json$/,
        type: 'javascript/auto',
        use: {
          loader: 'json-filter-loader',
          options: {
            used: ['version'],
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        cache: false,
        terserOptions: {
          mangle: { keep_classnames: true },
          compress: { keep_classnames: true },
          keep_classnames: true,
          output: { comments: false },
        },
      }),
    ],
  },
  plugins: [new webpack.optimize.ModuleConcatenationPlugin()],
};
