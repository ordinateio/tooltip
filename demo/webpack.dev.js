let {merge} = require('webpack-merge');
let common = require('./webpack.common.js');

module.exports = merge([
    common,
    {
        mode: 'development',
        devtool: 'source-map',
    }
]);
