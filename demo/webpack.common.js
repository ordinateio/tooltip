let Path = require('path');

let assetsConfig = {
    test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
    type: 'asset',
};

let sassConfig = {
    test: /\.s?css$/,
    use: [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                sourceMap: false,
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: {
                        autoprefixer: {},
                        cssnano: {},
                    },
                },
            },
        },
        'sass-loader',
    ],
};

let typescriptConfig = {
    test: /\.ts$/,
    use: [{
        loader: 'ts-loader',
        options: {
            configFile: 'tsconfig.json',
        },
    }],
};

let webpackConfig = {
    performance: {
        hints: false,
    },
    entry: Path.resolve(__dirname, 'src/index.ts'),
    output: {
        filename: '[name].js',
        path: Path.resolve(__dirname, 'dist/assets'),
    },
    optimization: {
        minimize: true,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [assetsConfig, sassConfig, typescriptConfig],
    },
    cache: {
        type: 'filesystem',
        cacheDirectory: Path.resolve(__dirname, '.cache'),
    },
};


module.exports = webpackConfig;
