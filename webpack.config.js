const fs = require('fs');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const sandboxHtmlFilePattern = /sandbox.*\.html$/;
const sandboxHtmlFiles = fs.readdirSync('./sandbox').filter(filename => filename.match(sandboxHtmlFilePattern));

const htmlWebpackPlugins = sandboxHtmlFiles.map(filename => new HtmlWebPackPlugin({
    template: `./sandbox/${filename}`,
    filename: `./${filename}`,
    inject: false
}));

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === 'development';

    const config = {
        entry: './src/index.js',
        output: {
            filename: 'chystat-embeddables.js',
            library: 'ChyEmbeddables',
            libraryTarget: 'umd',
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            configFile: "./babel.config.js",
                            envName: argv.mode
                        }
                    }
                }
            ]
        },
        plugins: [
            ...htmlWebpackPlugins
        ]
    };

    if (isDevelopment) {
        config.devtool = 'source-map';
        config.watchOptions = {
            ignored: /node_modules/
        };

    } else {
        config.optimization = {
            minimize: true
        };
    }

    return config;
};
