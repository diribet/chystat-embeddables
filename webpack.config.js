const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const packageName = require("./package.json").name;

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === 'development';

    const config = {
        entry: './src/index.js',
        output: {
            filename: `${packageName}.js`,
            library: 'ChyEmbeddables',
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            configFile: "./babel.config.js",
                            envName: argv.mode
                        }
                    }
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebPackPlugin({
                template: 'template/index.html',
                inject: false
            })
        ]
    };

    if (isDevelopment) {
        config.devtool = 'source-map';
        config.watchOptions = {
            ignored: /node_modules/
        };

        if (argv.analyzer) {
            console.log("Bundle analyzer is enabled...");
            config.plugins = [
                ...config.plugins,
                new BundleAnalyzerPlugin({
                    analyzerMode: 'static',
                    openAnalyzer: false
                })
            ];
        }
    } else {
        config.optimization = {
            minimize: true,
            minimizer: [
                new UglifyJsPlugin({
                    sourceMap: false
                })
            ]
        };
    }

    return config;
};
