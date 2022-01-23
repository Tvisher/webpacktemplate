const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.common.js');



module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        static: baseWebpackConfig.externals.paths.dist,
        port: 8081,
        client: {
            overlay: {
                warnings: true,
                errors: true,
            },
        }
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ],
});
