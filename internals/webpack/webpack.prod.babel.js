/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
/* eslint-enable import/no-extraneous-dependencies */

module.exports = require('./webpack.base.babel')({
  entry: {
    main: path.join(process.cwd(), 'src/index.js'),
  },

  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs',
  },

  plugins: [
  ],

  performance: {
    assetFilter: (assetFilename) => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)),
  },

  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'prop-types': {
      root: 'PropTypes',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      amd: 'prop-types',
    },
  },

  styleHMR: false,
});
