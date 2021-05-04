const Path = require('path');

const WPack = {
    mode: 'production',
    devtool: 'source-map',
    performance: {
        hints: false,
    },
    entry: Path.resolve(__dirname, 'src/main.ts'),
    output: {
        filename: '[name].js',
        path: Path.resolve(__dirname, 'dist/assets'),
    },
    cache: {
        type: 'filesystem',
        cacheDirectory: Path.resolve(__dirname, '.cache'),
    },
};

WPack.optimization = {
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
};

WPack.module = {
    rules: [
        {
            test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
            type: 'asset',
        },
        {
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
        },
        {
            test: /\.ts$/,
            use: [{
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.json',
                },
            }],
        },
    ],
};

WPack.resolve = {
    extensions: ['.ts', '.js'],
};

module.exports = WPack;
