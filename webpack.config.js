const Path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const WP = {
    performance: {
        hints: false,
    },
    entry: Path.resolve(__dirname, "demo", "src", "index.ts"),
    output: {
        filename: "bundle.js",
        path: Path.resolve(__dirname, "demo", "dist"),
    },
    cache: {
        type: "filesystem",
        cacheDirectory: Path.resolve(__dirname, ".cache"),
    },
};

WP.optimization = {
    minimize: true,
    minimizer: [
        new TerserPlugin({
            terserOptions: {
                format: {
                    comments: false,
                },
            },
            extractComments: false,
            parallel: true,
        }),
    ],
};

WP.module = {
    rules: [
        {
            test: /\.scss$/,
            use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: false,
                        url: false,
                    }
                },
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: {
                                autoprefixer: {},
                                cssnano: {
                                    preset: ["default", {discardComments: {removeAll: true}}]
                                },
                            },
                        },
                    },
                },
                "sass-loader",
            ],
        },
        {
            test: /\.ts$/,
            use: [{
                loader: "ts-loader",
                options: {
                    configFile: "tsconfig.loader.json",
                },
            }],
        },
    ],
}

WP.resolve = {
    extensions: [".ts", ".js"],
}

module.exports = WP;
