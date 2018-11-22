const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const pkg = require('../package.json');
const { resolve } = require('./utils');

const NODE_ENV = `"${process.env.NODE_ENV ? process.env.NODE_ENV : 'development'}"`;
let devUrl = `"${process.env.devUrl? process.env.devUrl : ''}"`;
const uaaHost = `"${process.env.uaaHost ? process.env.uaaHost : 'http://uaa.yeseer.cn'}"`;
const clientId = `"${process.env.clientId ? process.env.clientId : ''}"`;
const mqttBrokerUrl = devUrl.substr(7)+'mqttws';
module.exports = {
    entry: {
        main: '@/main',
        lib: ['@/vendors/vendors.base.js', '@/vendors/vendors.exten.js']
    },
    resolve: {
        extensions: ['.js', '.vue', '.less'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            'views': resolve('../src/views'),
            'router': resolve('../src/router'),
            'store': resolve('../src/store'),
            'libs': resolve('../src/libs'),
            '@fetch': resolve('../src/api/fetch'),
            '@': resolve('../src')
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                lib: {
                    chunks: 'initial',
                    test: 'lib',
                    name: 'lib',
                    enforce: true
                }
            }
        }
    },
    output: {
        path: resolve('../dist'),
        publicPath: '/',
        filename: 'assets/[name]_[hash:6].min.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                use: 'url-loader?limit=1024&name=assets/[hash:6].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: NODE_ENV,
                devUrl: devUrl,
                uaaHost: uaaHost,
                clientId: clientId,
                mqttBrokerUrl: mqttBrokerUrl,
                mqttTopic: 'sub/neucloud/websocket'
            }
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: pkg.description,
            inject: true,
            favicon: resolve('../favicon.ico'),
            filename: 'index.html',
            template: resolve('../src/template/index.html')
        })
    ]
};
