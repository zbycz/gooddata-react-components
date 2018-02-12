const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const webpack = require('webpack');

const title = require('./package.json').description;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

module.exports = ({ gdc = 'https://secure.gooddata.com', link = false } = {}) => {
    const proxy = {
        '/gdc': {
            target: gdc,
            secure: false,
            cookieDomainRewrite: '',
            onProxyReq: (proxyReq) => {
                // Browers may send Origin headers even with same-origin
                // requests. To prevent CORS issues, we have to change
                // the Origin to match the target URL.
                if (proxyReq.method === 'DELETE' && !proxyReq.getHeader('content-length')) {
                    // Only set content-length to zero if not already specified
                    proxyReq.setHeader('content-length', '0');
                }

                // White labeled resources are based on host header
                proxyReq.setHeader('host', 'localhost:8999');
                proxyReq.setHeader('referer', gdc);
                proxyReq.setHeader('origin', null);
            }
        },
        // This is only needed for localhost:####/account.html to work
        '/packages': {
            changeOrigin: true,
            cookieDomainRewrite: '',
            target: gdc,
            secure: false
        },
        '/lib': {
            changeOrigin: true,
            cookieDomainRewrite: '',
            target: gdc,
            secure: false
        },
        '/images': {
            changeOrigin: true,
            cookieDomainRewrite: '',
            target: gdc,
            secure: false
        },
        '/*.html': {
            cookieDomainRewrite: '',
            changeOrigin: true,
            secure: false,
            target: gdc
        }
    };

    const resolve = {
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: link ? {
                react: path.resolve(__dirname, '../node_modules/react'),
                'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
                '@gooddata/react-components/styles': path.resolve(__dirname, '../styles/'),
                '@gooddata/react-components': path.resolve(__dirname, '../dist/')
            } : {}
        }
    };

    return Object.assign({}, resolve, {
        entry: ['./src/index.jsx'],
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({
                title
            }),
            new CircularDependencyPlugin({
                exclude: /node_modules|dist/
            }),
            new webpack.DefinePlugin({
                GDC: JSON.stringify(gdc)
            })
        ],
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        },
        node: {
            __filename: true
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    loaders: ['style-loader', 'css-loader']
                },
                {
                    test: /.scss$/,
                    loaders: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.(jpe?g|gif|png|svg|ico|eot|woff2?|ttf|wav|mp3)$/,
                    use: 'file-loader'
                }
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            historyApiFallback: true,
            compress: true,
            port: 8999,
            proxy,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
                "Access-Control-Allow-Credentials": "true"
            }
        }
    });
};
