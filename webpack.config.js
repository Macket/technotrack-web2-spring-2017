const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: {
        index: './index.jsx',
    },
    context: `${__dirname}/static_src`,
    output: {
        path: `${__dirname}/static/build`,
        filename: NODE_ENV === 'development' ? '[name].js' : '[name]-[hash].js',
        publicPath: '/static/build/',
    },

    watch: NODE_ENV === 'development',

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new BundleTracker({ filename: './webpack-stats.json' }),
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: `${__dirname}/static_src`,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded',
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
                loader: 'url-loader?limit=4096&name=[path][name].[ext]',
            },
        ],
    },

    devtool: NODE_ENV === 'development' ? 'cheap--module-source-map' : false,

    resolve: {
        modules: [`${__dirname}/static_src`, 'node_modules'],
        extensions: ['.js', '.jsx'],
    },

};

if (NODE_ENV !== 'development') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true,
            },
        })
    );
}