'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = {
    entry: [
        path.join(__dirname, 'app/index.js')
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name]-[hash].min.js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),

        new ExtractTextPlugin('[name]-[hash].min.css'),

        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compressor: {
                unused: true,
                dead_code: true,
                drop_debugger: true,
                conditionals: true,
                warnings: false,
                evaluate: true,
                drop_console: true,
                sequences: true,
                booleans: true,
            }
        }),

        new StatsPlugin('webpack.stats.json', {
            source: false,
            modules: false
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            options: {
                postcss: [
                    require('autoprefixer')
                ]
            }
        })
    ],

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    configFile: '.eslintrc',
                    failOnWarning: false,
                    failOnError: false
                }
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.json?$/,
                loader: 'json'
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({ use: 'sass-loader' })
            }, {
                test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            }, {
                test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/,
                loader: 'file'
            }
        ]
    }
};
