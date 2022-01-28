const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');



const PATHS = {
    src: path.join(__dirname, "../src"),
    dist: path.join(__dirname, "../dist"),
    assets: "assets/"
}

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        app: PATHS.src,
        lk: `${PATHS.src}/lk.js`,
    },
    output: {
        filename: `${PATHS.assets}js/[name].[hash].js`,
        path: path.resolve(__dirname, PATHS.dist),
        publicPath: '/',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true,
                }
            }
        },
    },
    module: {
        rules: [
            // js
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            // vue
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loader: {
                        scss: 'vue-style-loader!css-loader!sass-loader',
                    }
                }
            },
            // img
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            // fonts
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            // css
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                ],
            },
            // scss
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            implementation: require.resolve("sass"),
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        alias: {
            "~": 'src',
            "vue$": 'vue/dist/vue.js',
        },
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[hash].css`,
        }),
        new HtmlWebpackPlugin({
            template: `${PATHS.src}/index.html`,
            filename: './index.html',
            // inject: false,
        }),

        new CopyWebpackPlugin({
            patterns: [
                { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img/`, },
                { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts/`, },
                { from: `${PATHS.src}/static`, to: ``, }
            ],
        }),
    ],
}