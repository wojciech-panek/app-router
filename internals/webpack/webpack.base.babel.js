/**
 * COMMON WEBPACK CONFIGURATION
 */

/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
/* eslint-enable import/no-extraneous-dependencies */
/* eslint-enable import/no-extraneous-dependencies */

const externals = {};


module.exports = (options) => {
  const webpackConfig = {
    entry: options.entry,
    output: Object.assign({
      path: path.resolve(process.cwd(), 'dist'),
      publicPath: '/',
    }, options.output),
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
        },
        query: options.babelQuery,
      }, {
        // Do not transform vendor's CSS with CSS-modules
        // The point is that they remain in global scope.
        // Since we require these CSS files in our JS or CSS files,
        // they will be a part of our compilation either way.
        // So, no need for ExtractTextPlugin here.
        test: /\.css$/,
        include: /node_modules/,
        loaders: [{
          loader: 'style-loader',
          options: {
            hmr: options.styleHMR,
          },
        }, {
          loader: 'css-loader',
        }],
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      }, {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              query: {
                name: '[name].[ext]',
              },
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              query: {
                progressive: true,
                optimizationLevel: 7,
                interlaced: false,
                pngquant: {
                  quality: '65-90',
                  speed: 4,
                },
              },
            },
          },
        ],
      }, {
        test: /\.html$/,
        loader: 'html-loader',
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.(mp4|webm)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
        },
      }],
    },
    plugins: options.plugins.concat([
      // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
      // inside your code for any environment checks; UglifyJS will automatically
      // drop any unreachable code.
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
      new webpack.NamedModulesPlugin(),
    ]),
    resolve: {
      modules: ['app', 'node_modules'],
      extensions: [
        '.js',
        '.jsx',
        '.react.js',
      ],
      mainFields: [
        'browser',
        'jsnext:main',
        'main',
      ],
    },
    externals: externals,
    devtool: options.devtool,
    target: 'web',
    performance: options.performance || {},
  };

  return webpackConfig;
};

