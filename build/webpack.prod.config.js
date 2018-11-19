const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const { resolve } = require('./utils');

const env = 'production';

module.exports = merge(webpackBaseConfig, {
    mode: env,
    devtool: false,
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { minimize: true }
                    },
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new cleanWebpackPlugin(['dist/*'], {
            root: resolve('../')
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[hash].css'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: '"production"'
        //     }
        // })
    ]
});