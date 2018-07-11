var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    externals: {
        sqlite3: 'commonjs sqlite3',
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /\.spec\.ts$/,
                use: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    },
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/images/[name].[ext]'
                // use: [
                //     {
                //       loader: 'file-loader',
                //       query: {
                //         name: 'assets/images/[name].[ext]'
                //       }
                //     }
                // ]
            },
            {
                test: /\.css$/,
                loaders: 'style-loader!css-loader'
            },

			{
                test: /\.scss$/,
                exclude: /node_modules/, 
                use: [
                    {
                        loader: "raw-loader"
                    }, 
                    {
                        loader: "sass-loader"
                    }
                ]
			},
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({template: 'src/index.html'}),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(@angular|esm5)/,
            path.resolve(__dirname, '../src')
        ),
        new CopyWebpackPlugin(
        [
            {
                from: 'src/assets',
                to: 'assets',
            }
        ])
    ],

    target:'electron-renderer'
};
