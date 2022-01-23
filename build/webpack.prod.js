const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.common');

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    plugins: [],
});

