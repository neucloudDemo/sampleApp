const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const { resolve } = require('./utils');

const env = 'development';

const port = process.env.PORT || 8080;

module.exports = merge(webpackBaseConfig, {
    mode: env,
    devtool: '#cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    {
                        loader: "vue-style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin()
    ],
    devServer: {
        hot: true,
        quiet: false,
        inline: true,
        compress: true,
        contentBase: resolve('../dist'),
        disableHostCheck: true,
        historyApiFallback: true,
        port: port
    }
});